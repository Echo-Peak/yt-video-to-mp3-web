import "./App.css";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { UrlInput } from "../components/UrlInput";
import { useApi } from "../providers/ApiProvider";
import { useVideoProcessHistory } from "../providers/VideoProcessHistoryProvider";
import { CurrentProcessingVideo } from "../components/CurrentProcessingVideo";
import { VideoHistory } from "../components/VideoHistory";
import { UrlInputLabel } from "../components/UrlInputLabel";
import { AuthButtons } from "../components/AuthButtons";

export const MainPage = () => {
  const { currentVideo, processingError } = useApi();
  const { processingHistory, clearHistory } = useVideoProcessHistory();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Card
        variant="glass"
        sx={{ p: 2, mb: 4, display: "flex", justifyContent: "flex-end" }}
      >
        <AuthButtons />
      </Card>
      <Card variant="glass" sx={{ p: 4 }}>
        <Stack spacing={3} component="main" role="main">
          <UrlInputLabel />
        </Stack>

        <Stack sx={{ mt: 2 }}>
          <UrlInput />
        </Stack>
      </Card>

      <Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          marginTop: "32px",
          gap: "32px",
          flexWrap: "wrap",
        }}
      >
        <Card variant="glass" sx={{ p: 4, mt: 4, flex: 1 }}>
          <Stack>
            <CurrentProcessingVideo
              videoInfo={currentVideo}
              processingError={processingError}
            />
          </Stack>
        </Card>

        <Card
          variant="glass"
          sx={{ p: 4, mt: 4, flex: 1, maxHeight: 500, overflow: "auto" }}
        >
          <Box
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" mb={1}>
              History
            </Typography>
            <Button
              variant="outlined"
              onClick={clearHistory}
              disabled={processingHistory.length === 0}
            >
              Clear History
            </Button>
          </Box>
          <Box>
            <VideoHistory currentHistory={processingHistory} />
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
