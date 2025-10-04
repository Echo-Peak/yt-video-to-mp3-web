export type YouTubeVideoListResponse = {
  kind: "youtube#videoListResponse";
  etag: string;
  items: YouTubeVideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type YouTubeVideoItem = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: YouTubeVideoSnippet;
};

export type YouTubeVideoSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: "none" | "upcoming" | "live";
  defaultLanguage?: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
};

export type YouTubeThumbnails = {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
};

export type YouTubeThumbnail = {
  url: string;
  width: number;
  height: number;
};
