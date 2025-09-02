import { useQuery } from "@tanstack/react-query";
import { apiClient, apiUrls } from "../api/api-client";
import { IDestinationResponse } from "../types";

export const useGetDestinations = () =>
  useQuery({
    queryKey: ["get-destinations"],
    queryFn: () =>
      apiClient.get<unknown, { destinations: IDestinationResponse[] }>(
        apiUrls.destinations
      ),
    staleTime: Infinity,
  });
