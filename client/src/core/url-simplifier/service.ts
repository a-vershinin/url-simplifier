// Definitions
import type { UrlSimplifierType } from "@/core/url-simplifier/types";

// Utils
import { httpInstanse, httpInstanseError } from "@/infrastructure/client";
import { CLIENT_API_URL_HTTP } from "@/infrastructure/api";

export const fetchUrls = async () => {
  try {
    const httpResponse = await httpInstanse.get<{
      data: UrlSimplifierType[];
    }>("/urls");

    const result = httpResponse.data;
    if (!("data" in result)) {
      throw new Error("http response is not provided data");
    }

    return result.data;
  } catch (err) {
    if (err instanceof httpInstanseError) {
      const errBody = err?.response?.data.error as { type: string; message: string };

      throw errBody || { type: "httpError", message: "Something when wrong" };
    }
    throw { type: "Unexpected", message: "An unexpected error occurred!" };
  }
};

export const createUrl = async (payload: { originalUrl: string }) => {
  try {
    const httpResponse = await httpInstanse.post<{
      data: UrlSimplifierType;
    }>("/urls", payload);

    const result = httpResponse.data;
    if (!("data" in result)) {
      throw new Error("http response is not provided data");
    }

    return result.data;
  } catch (err) {
    if (err instanceof httpInstanseError) {
      const errBody = err?.response?.data.error as {
        type: string;
        message: string;
        fields?: Record<string, string[]>;
      };

      throw errBody || { type: "httpError", message: "Something when wrong" };
    }
    throw { type: "Unexpected", message: "An unexpected error occurred!" };
  }
};

export const getOneUrl = async (payload: { shortUrl: string }) => {
  try {
    const { shortUrl } = payload;
    const httpResponse = await httpInstanse.get<{
      data: UrlSimplifierType;
    }>(`/urls/${shortUrl}`);

    const result = httpResponse.data;
    if (!("data" in result)) {
      throw new Error("http response is not provided data");
    }

    return result.data;
  } catch (err) {
    if (err instanceof httpInstanseError) {
      console.log("-err-", err);
      const errBody = err?.response?.data.error as {
        type: string;
        message: string;
      };

      throw errBody || { type: "httpError", message: "Something when wrong" };
    }
    throw { type: "Unexpected", message: "An unexpected error occurred!" };
  }
};

export const redirectPathApi = (id: string) => CLIENT_API_URL_HTTP + `/urls/${id}/redirect`;
