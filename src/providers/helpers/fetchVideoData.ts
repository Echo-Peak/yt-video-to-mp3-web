import {
  YouTubeVideoListResponse,
  YouTubeVideoSnippet,
} from "../../types/YouTubeVideoSnippet";

const apiKey = process.env.REACT_APP_YT_API_KEY;

export const fetchVideoData = async (
  videoId: string
): Promise<{ snippet: YouTubeVideoSnippet; id: string } | undefined> => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch video data from YouTube API");
  }
  const data = (await response.json()) as YouTubeVideoListResponse;
  if (data.items.length === 0) {
    return undefined;
  }
  return {
    snippet: data.items[0].snippet,
    id: data.items[0].id,
  };
};
