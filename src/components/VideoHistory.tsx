import { Box, List, Tooltip } from "@mui/material";
import { VideoInfoDto } from "../types/VideoInfoDto";
import { convertToFriendlyDate } from "../helpers/convertTofreindlyDate";
import { useUrlSelector } from "../providers/UrlSelectorProvider";

export type VideoHistoryProps = {
  currentHistory: VideoInfoDto[];
};
export const VideoHistory = ({ currentHistory }: VideoHistoryProps) => {
  const { setUrl } = useUrlSelector();

  if (currentHistory.length === 0) {
    return <Box>No videos have been processed yet.</Box>;
  }

  const sortByRecent = [...currentHistory].sort(
    (a, b) =>
      new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
  );
  return (
    <Box>
      <List>
        {sortByRecent.map((video) => (
          <Tooltip
            key={video.id}
            title={`Click to download "${video.title}"`}
            placement="top"
          >
            <Box
              key={video.id}
              display="flex"
              flexDirection={"row"}
              mb={2}
              p={2}
              border="1px solid"
              borderColor="divider"
              borderRadius={2}
              onClick={() => setUrl(video.source)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              <Box mr={2}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: "100px", borderRadius: 8, marginBottom: 8 }}
                />
              </Box>
              <Box>
                <Box fontWeight="bold">{video.title}</Box>
                <Box fontSize="0.875rem" color="text.secondary">
                  Processed on: {convertToFriendlyDate(video.processedAt)}
                </Box>
              </Box>
            </Box>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};
