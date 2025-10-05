import { ConversionState } from "./ConversionState";

export type StatusResponse = {
  status: ConversionState;
  downloadUrl?: string;
};
