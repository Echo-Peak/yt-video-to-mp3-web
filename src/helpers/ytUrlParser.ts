const ytPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i;

export const extractVideoId = (url: string): string => {
  const match = url.match(ytPattern);
  if (match && match[4]) {
    return match[4];
  }
  throw new Error("Invalid YouTube URL");
};

export const isValidUrl = (url: string): boolean => ytPattern.test(url.trim());
