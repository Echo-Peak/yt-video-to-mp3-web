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
  currentlyProcessing?: VideoInfoDto | null;
  processingError?: string;
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
  const [currentlyProcessing, setCurrentlyProcessing] =
    useState<VideoInfoDto | null>(null);
  const [processingError, setProcessingError] = useState<string>("");

  const [conversionStatusInterval, setConversionStatusInterval] =
    useState<NodeJS.Timeout | null>(null);

  const [videoStatus, setVideoStatus] = useState<ConversionState>(
    ConversionState.Idle
  );
  const api = useBackendApi();
  const videoHistory = useVideoHistory();

  const createInterval = () => {
    clearInterval(conversionStatusInterval as NodeJS.Timeout);
    const interval = setInterval(() => {
      const videoId = getCachedVideoId();
      if (videoId) {
        api
          .getStatus(videoId)
          .then((status) => {
            setVideoStatus(status);
            if (status === ConversionState.Completed) {
              clearInterval(interval);
            }
            if (status === ConversionState.Error) {
              clearInterval(interval);
            }
          })
          .catch((error) => {
            setProcessingError((error as Error).message);
            setVideoStatus(ConversionState.Error);
            setCurrentlyProcessing(null);
            clearInterval(interval);
          });
      }
    }, 5000);
    setConversionStatusInterval(interval);
  };

  const prepareSend = async (videoUrl: string) => {
    localStorage.setItem("videoId", extractVideoId(videoUrl));
    setVideoStatus(ConversionState.InProgress);
    setProcessingError("");

    try {
      const videoData = await fetchVideoData(extractVideoId(videoUrl));
      if (!videoData) {
        throw new Error("Invalid YouTube video URL");
      }
      setCurrentlyProcessing({
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
      setCurrentlyProcessing(null);
      setProcessingError((error as Error).message);
      return;
    }
  };

  const value: ApiContextType = {
    sendVideo: prepareSend,
    videoStatus: videoStatus,
    currentlyProcessing,
    processingError,
  };

  const getCachedVideoId = () => {
    return localStorage.getItem("videoId");
  };

  useEffect(() => {
    const videoId = getCachedVideoId();
    if (videoId) {
      api.getStatus(videoId).then((status) => {
        setVideoStatus(status);
      });
    }
  }, [setVideoStatus, api]);

  useEffect(() => {
    if (videoStatus === ConversionState.Completed && currentlyProcessing) {
      videoHistory.add(currentlyProcessing);
      setCurrentlyProcessing(null);
    }
  }, [videoStatus, currentlyProcessing, videoHistory]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
