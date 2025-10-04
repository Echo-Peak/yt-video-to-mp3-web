import { VideoInfoDto } from "../types/VideoInfoDto";

export const useVideoHistory = () => {
  return {
    add(video: VideoInfoDto) {
      const history = JSON.parse(
        localStorage.getItem("videoHistory") || "[]"
      ) as VideoInfoDto[];
      const updatedHistory = [
        video,
        ...history.filter((v) => v.id !== video.id),
      ];
      localStorage.setItem("videoHistory", JSON.stringify(updatedHistory));
    },
    getAll(): VideoInfoDto[] {
      return JSON.parse(localStorage.getItem("videoHistory") || "[]");
    },
    clear() {
      localStorage.removeItem("videoHistory");
    },
  };
};
