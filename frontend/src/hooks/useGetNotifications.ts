import { useQuery } from "@tanstack/react-query";
import { apiClient, apiUrls } from "../api/api-client";
import { INotification } from "../types";

export const useGetNotifications = () =>
  useQuery({
    queryKey: ["get-notifications"],
    queryFn: () =>
      apiClient.get<unknown, { notifications: INotification[] }>(
        apiUrls.notifications
      ),
  });
