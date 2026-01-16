import { useMutation } from "@apollo/client/react";
import { GlobalStore } from "../stores";
import { IMutateSaveDestinationsResponse } from "../types";
import { ApolloCache } from "@apollo/client";
import { NavigateFunction } from "react-router-dom";
import { routes } from "../config";
import { graphqlClient } from "../api";

interface IArgs {
  globalStore: GlobalStore;
  saveDestinations: useMutation.MutationFunction<
    IMutateSaveDestinationsResponse,
    {
      [x: string]: unknown;
    },
    ApolloCache
  >;
  userId: number;
  navigate: NavigateFunction;
}

export const redirectOnAuth = async ({
  globalStore,
  saveDestinations,
  userId,
  navigate,
}: IArgs) => {
  if (globalStore.selectedDestinations.size > 0) {
    try {
      await saveDestinations({
        variables: {
          input: {
            userId,
            destinationIds: [...globalStore.selectedDestinations],
          },
        },
      });
      globalStore.removeAllDestinations();
      graphqlClient.resetStore();
    } catch (err) {
      console.error("Unable to save destinations from store, ", err);
    }
  }
  navigate(routes.profile);
};
