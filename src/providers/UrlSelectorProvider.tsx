import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useApi } from "./ApiProvider";

interface UrlSelectorContextType {
  url: string;
  setUrl: (url: string) => void;
}

const UrlSelectorContext = createContext<UrlSelectorContextType | undefined>(
  undefined
);

export const UrlSelectorProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState<string>("");
  const { downloadLinkAvailable } = useApi();

  useEffect(() => {
    if (downloadLinkAvailable) {
      setUrl("");
    }
  }, [downloadLinkAvailable]);

  return (
    <UrlSelectorContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlSelectorContext.Provider>
  );
};

export const useUrlSelector = () => {
  const context = useContext(UrlSelectorContext);
  if (!context) {
    throw new Error("useUrlSelector must be used within a UrlSelectorProvider");
  }
  return context;
};
