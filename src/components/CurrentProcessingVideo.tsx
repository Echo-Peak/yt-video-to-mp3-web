import { Box, Button, Typography } from "@mui/material";
import { VideoInfoDto } from "../types/VideoInfoDto";

export type CurrentProcessingVideoProps = {
  videoInfo?: VideoInfoDto | null;
  processingError?: string;
};

export const CurrentProcessingVideo = (props: CurrentProcessingVideoProps) => {
  if (props.processingError) {
    return (
      <Box>
        <Typography variant="h5" color="error" gutterBottom>
          Error processing video
        </Typography>
        <Typography mt={2} variant="h6" color="text.secondary" gutterBottom>
          {props.processingError}
        </Typography>
      </Box>
    );
  }

  if (!props.videoInfo) {
    return <Box>No video is currently being processed.</Box>;
  }

  return (
    <Box>
      <Typography variant="h5" color="text.primary" gutterBottom>
        Video is being processed
      </Typography>
      <Typography mt={2} variant="h6" color="text.secondary" gutterBottom>
        {props.videoInfo.title}
      </Typography>
      <Box
        component="img"
        src={props.videoInfo.thumbnail}
        alt={props.videoInfo.title}
        sx={{ width: "100%", borderRadius: 1, mb: 2 }}
      />
      <Box fontSize="small" color="text.secondary">
        <Button href={props.videoInfo.source} target="_blank" rel="noreferrer">
          Open in YouTube
          <br></br>
          {props.videoInfo.source}
        </Button>
      </Box>
    </Box>
  );
};
