import { useQuery } from "@apollo/client/react";
import { IDestinationsResponse } from "../types";
import { DESTINATIONS_SCHEME } from "../api";

export const useGetDestinations = () =>
  useQuery<IDestinationsResponse>(DESTINATIONS_SCHEME, {
    fetchPolicy: "network-only",
  });
