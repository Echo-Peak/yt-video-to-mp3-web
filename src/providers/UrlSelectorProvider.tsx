import React, { createContext, useState, useContext, ReactNode } from "react";

interface UrlSelectorContextType {
  url: string;
  setUrl: (url: string) => void;
}

const UrlSelectorContext = createContext<UrlSelectorContextType | undefined>(
  undefined
);

export const UrlSelectorProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState<string>("");

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
