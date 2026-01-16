import { useMutation } from "@apollo/client/react";
import { GlobalStore } from "../stores";
import {
  IMutateSaveDestinationsResponse,
  IVerifySessionResponse,
} from "../types";
import { ApolloCache } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { routes } from "../config";

interface IArgs {
  globalStore: GlobalStore;
  saveDestinations: useMutation.MutationFunction<
    IMutateSaveDestinationsResponse,
    {
      [x: string]: unknown;
    },
    ApolloCache
  >;
  verifySessionData?: IVerifySessionResponse;
}

export const redirectOnAuth = async ({
  globalStore,
  saveDestinations,
  verifySessionData,
}: IArgs) => {
  if (globalStore.selectedDestinations.size > 0) {
    try {
      await saveDestinations({
        variables: {
          input: {
            userId: verifySessionData?.verifySession?.userId,
            destinationIds: [...globalStore.selectedDestinations],
          },
        },
      });
      globalStore.removeAllDestinations();
    } catch (err) {
      console.error("Unable to save destinations from store, ", err);
    }
  }
  return <Navigate to={routes.profile} />;
};
