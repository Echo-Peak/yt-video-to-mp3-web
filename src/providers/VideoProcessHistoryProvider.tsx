import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { VideoInfoDto } from "../types/VideoInfoDto";
import { useVideoHistory } from "../services/useVideoHistory";

type VideoProcessHistoryContextType = {
  processingHistory: VideoInfoDto[];
  clearHistory: () => void;
};

const VideoProcessHistoryContext = createContext<
  VideoProcessHistoryContextType | undefined
>(undefined);

export const VideoProcessHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<VideoInfoDto[]>([]);

  const { getAll, clear } = useVideoHistory();

  useEffect(() => {
    setHistory(getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearHistory = () => {
    setHistory([]);
    clear();
  };

  return (
    <VideoProcessHistoryContext.Provider
      value={{ processingHistory: history, clearHistory }}
    >
      {children}
    </VideoProcessHistoryContext.Provider>
  );
};

export const useVideoProcessHistory = () => {
  const context = useContext(VideoProcessHistoryContext);
  if (!context) {
    throw new Error(
      "useVideoProcessHistory must be used within a VideoProcessHistoryProvider"
    );
  }
  return context;
};
