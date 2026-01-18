import { useMutation } from "@apollo/client/react";
import { SAVE_DESTINATIONS_SCHEME } from "../api";
import { IMutateSaveDestinationsResponse } from "../types";

export const useMutateSaveDestinations = () =>
  useMutation<IMutateSaveDestinationsResponse>(SAVE_DESTINATIONS_SCHEME);
