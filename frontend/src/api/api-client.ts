import axios from "axios";

const baseUrl = "http://localhost:3001/api" as string;
const wsBaseUrl = "ws://localhost:3001/api" as string;
const apiClient = axios.create();

apiClient.defaults.baseURL = baseUrl;
apiClient.interceptors.response.use((response) => response.data);

const apiUrls: Record<string, string> = {
  destinations: "/destinations",
  notifications: "/notifications",
  updateNotifications: `${wsBaseUrl}/update-notifications`,
};

export { apiClient, apiUrls };
