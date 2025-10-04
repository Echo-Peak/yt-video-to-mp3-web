import { Box, Stack, Typography } from "@mui/material";

export const UrlInputLabel = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        aria-hidden="true"
        sx={{
          fontSize: 36,
          lineHeight: 1,
          width: 48,
          height: 48,
          display: "grid",
          placeItems: "center",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          backdropFilter: "blur(20px) saturate(120%)",
        }}
      >
        ♬
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={700}>
          YouTube to MP3 converter
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Paste a YouTube URL, then click <strong>Convert</strong>.
        </Typography>
      </Box>
    </Stack>
  );
};
