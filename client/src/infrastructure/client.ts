// Core
import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Utils
import { CLIENT_API_URL_HTTP } from "@/infrastructure/api";

export const httpInstanseError = AxiosError;

const defaultOptions: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// for browser requests
export const httpInstanse = axios.create({
  ...defaultOptions,
  baseURL: CLIENT_API_URL_HTTP,
});
