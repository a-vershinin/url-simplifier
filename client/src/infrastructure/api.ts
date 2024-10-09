// Utils
import { PUBLIC_CLIENT_API_HOST } from "@/config";

// Base
const HOST = "http://app.dev";
const API_PATH = "/api";

// API Client base
const CLIENT_API_HOST = PUBLIC_CLIENT_API_HOST || HOST;

// API Client
export const CLIENT_API_URL_HTTP = `${CLIENT_API_HOST}${API_PATH}`;
