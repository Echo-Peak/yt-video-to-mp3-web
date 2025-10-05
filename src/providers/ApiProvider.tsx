import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useBackendApi } from "../services/useBackendApi";
import { ConversionState } from "../types/ConversionState";
import { extractVideoId } from "../helpers/ytUrlParser";
import { VideoInfoDto } from "../types/VideoInfoDto";
import { fetchVideoData } from "./helpers/fetchVideoData";
import { YouTubeThumbnails } from "../types/YouTubeVideoSnippet";
import { useVideoHistory } from "../services/useVideoHistory";

type ApiContextType = {
  sendVideo: (videoUrl: string) => Promise<void>;
  videoStatus?: ConversionState;
  currentVideo?: VideoInfoDto | null;
  processingError?: string;
  downloadLinkAvailable?: string;
  isProcessing?: boolean;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const selectThumbnailSize = (thumbnails: YouTubeThumbnails) => {
  if (!thumbnails) return undefined;
  return (
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url
  );
};

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoInfoDto | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [downloadLinkAvailable, setDownloadLinkAvailable] =
    useState<string>("");
  const [processingError, setProcessingError] = useState<string>("");

  const [conversionStatusInterval, setConversionStatusInterval] =
    useState<NodeJS.Timeout | null>(null);

  const [videoStatus, setVideoStatus] = useState<ConversionState>(
    ConversionState.Idle
  );
  const api = useBackendApi();

  const createInterval = () => {
    clearInterval(conversionStatusInterval as NodeJS.Timeout);
    const interval = setInterval(() => {
      const videoId = getCachedVideoId();
      if (videoId) {
        api
          .getStatus(videoId)
          .then((res) => {
            setVideoStatus(res.status);
            if (res.status === ConversionState.Completed) {
              setDownloadLinkAvailable(res.downloadUrl || "");
              clearInterval(interval);
            }
            if (res.status === ConversionState.Error) {
              clearInterval(interval);
            }
          })
          .catch((error) => {
            setProcessingError((error as Error).message);
            setVideoStatus(ConversionState.Error);
            setCurrentVideo(null);
            clearInterval(interval);
          })
          .finally(() => {
            setIsProcessing(false);
          });
      }
    }, 5000);
    setConversionStatusInterval(interval);
  };

  const prepareSend = async (videoUrl: string) => {
    localStorage.setItem("videoId", extractVideoId(videoUrl));
    setVideoStatus(ConversionState.InProgress);
    setProcessingError("");
    setDownloadLinkAvailable("");
    setIsProcessing(true);
    try {
      const videoData = await fetchVideoData(extractVideoId(videoUrl));
      if (!videoData) {
        throw new Error("Invalid YouTube video URL");
      }

      setCurrentVideo({
        id: videoData.id,
        title: videoData.snippet.title as string,
        thumbnail: selectThumbnailSize(videoData.snippet.thumbnails) || "",
        source: videoUrl,
        processedAt: new Date().toISOString(),
      });

      await api.sendVideoUrl(videoUrl);
      createInterval();
    } catch (error) {
      setVideoStatus(ConversionState.Error);
      setCurrentVideo(null);
      setProcessingError((error as Error).message);
      return;
    }
  };

  const value: ApiContextType = {
    sendVideo: prepareSend,
    videoStatus: videoStatus,
    currentVideo,
    processingError,
    downloadLinkAvailable,
    isProcessing,
  };

  const getCachedVideoId = () => {
    return localStorage.getItem("videoId");
  };

  useEffect(() => {
    const videoId = getCachedVideoId();
    if (videoId) {
      api.getStatus(videoId).then((res) => {
        setVideoStatus(res.status);
      });
    }
  }, [setVideoStatus, api]);

  useEffect(() => {
    if (videoStatus === ConversionState.Completed && currentVideo) {
      setCurrentVideo(null);
    }
  }, [videoStatus, currentVideo]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
