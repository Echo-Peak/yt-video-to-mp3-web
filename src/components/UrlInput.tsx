import { Box, Button, Stack, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useApi } from "../providers/ApiProvider";
import { isValidUrl } from "../helpers/ytUrlParser";
import { useUrlSelector } from "../providers/UrlSelectorProvider";

export const UrlInput = () => {
  const { sendVideo, downloadLinkAvailable, isProcessing } = useApi();
  const { url, setUrl } = useUrlSelector();

  const valid = useMemo(() => isValidUrl(url.trim()), [url]);

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valid) {
      sendVideo(url);
    }
  };

  return (
    <Box component="form" onSubmit={send} noValidate>
      <Stack spacing={2}>
        <TextField
          id="urlInput"
          label="YouTube URL"
          type="url"
          inputMode="url"
          placeholder="https://www.youtube.com/watch?v=…"
          autoComplete="url"
          value={url}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255,255,255,0.08)",
              "&.Mui-focused": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "rgba(0, 0, 0, 0.8)" },
              "&.Mui-focused fieldset": { borderColor: "red" },
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.08) inset",
              WebkitTextFillColor: "white",
              transition: "background-color 9999s ease-out 0s",
            },
          }}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          aria-invalid={!valid && url.length > 0}
          required
          fullWidth
        />
        <Button
          id="convertBtn"
          type="submit"
          variant="outlined"
          size="large"
          disabled={isProcessing || !valid}
        >
          Convert
        </Button>

        {downloadLinkAvailable && (
          <Button
            id="downloadBtn"
            variant="contained"
            size="large"
            color="secondary"
            href={downloadLinkAvailable}
            target="_blank"
            rel="noreferrer"
          >
            Download MP3
          </Button>
        )}
      </Stack>
    </Box>
  );
};
