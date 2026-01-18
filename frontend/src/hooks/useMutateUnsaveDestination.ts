import { useMutation } from "@apollo/client/react";
import { UNSAVE_DESTINATION_SCHEME } from "../api";
import { IMutateUnsaveDestinationResponse } from "../types";

export const useMutateUnsaveDestination = () =>
  useMutation<IMutateUnsaveDestinationResponse>(UNSAVE_DESTINATION_SCHEME);
