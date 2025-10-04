import { useMemo, useState } from "react";

const ytPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{6,}/i;

export const YouTubeToMp3Card = () => {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<
    "Idle" | "Submitting" | "Processing" | "Done" | "Error"
  >("Idle");
  const [status, setStatus] = useState("Waiting for URL…");
  const [progress, setProgress] = useState(0);
  const [downloadHref, setDownloadHref] = useState<string | null>(null);

  const valid = useMemo(() => ytPattern.test(url.trim()), [url]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setPhase("Submitting");
    setStatus("Submitting request…");
    setProgress(15);
    try {
      setPhase("Processing");
      setStatus("Converting…");
      setProgress(55);
      await new Promise((r) => setTimeout(r, 600));
      setProgress(85);
      await new Promise((r) => setTimeout(r, 500));
      setDownloadHref("#");
      setPhase("Done");
      setStatus("Ready to download.");
      setProgress(100);
    } catch {
      setPhase("Error");
      setStatus("Something went wrong. Try again.");
      setProgress(0);
      setDownloadHref(null);
    }
  };
};
