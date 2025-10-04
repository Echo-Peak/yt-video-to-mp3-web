import { getClientUuid } from "../helpers/getClientUuid";
import { ConversionState } from "../types/ConversionState";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export type ApiRequestData = {
  endpoint: string;
  videoUrl?: string;
  videoId?: string;
  clientId: string;
};

export const sendConversionRequest = async (
  data: ApiRequestData
): Promise<Record<string, unknown>> => {
  const response = await fetch(`${API_BASE_URL}${data.endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Unexpected response from server");
  }

  const result = await response.json();
  return result;
};

export const useBackendApi = () => {
  const sendVideoUrl = async (videoUrl: string) => {
    const clientId = getClientUuid();

    await sendConversionRequest({
      endpoint: "/convert",
      videoUrl,
      clientId,
    });
  };

  const getStatus = async (videoId: string): Promise<ConversionState> => {
    const clientId = getClientUuid();
    try {
      const result = await sendConversionRequest({
        endpoint: "/status",
        videoId,
        clientId,
      });
      if (result.status === "in-progress") {
        return ConversionState.InProgress;
      }
      if (result.status === "completed") {
        return ConversionState.Completed;
      }
      if (result.status === "error") {
        return ConversionState.Error;
      }
    } catch {
      return ConversionState.Error;
    }
    return ConversionState.Idle;
  };
  return {
    sendVideoUrl,
    getStatus,
  };
};
