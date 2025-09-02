import axios from "axios";

const baseUrl = "https://localhost:3001/api" as string;
const apiClient = axios.create();

apiClient.defaults.baseURL = baseUrl;

const apiUrls: Record<string, string> = { destinations: "/destinations" };

export { apiClient, apiUrls };
