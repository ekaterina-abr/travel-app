import { useMutation } from "@apollo/client/react";
import {
  IGetUserInfoResponse,
  IMutateSaveDestinationsResponse,
} from "../types";
import { ApolloCache, ApolloClient } from "@apollo/client";
import { GlobalStore } from "../stores";

interface IArgs {
  dest: string;
  isAuth: boolean;
  saveDestinations: useMutation.MutationFunction<
    IMutateSaveDestinationsResponse,
    {
      [x: string]: unknown;
    },
    ApolloCache
  >;
  globalStore: GlobalStore;
  userInfoData?: IGetUserInfoResponse;
  userInfoRefetch: () => Promise<
    ApolloClient.QueryResult<IGetUserInfoResponse>
  >;
}

export const addDestination = async ({
  dest,
  isAuth,
  saveDestinations,
  globalStore,
  userInfoData,
  userInfoRefetch,
}: IArgs) => {
  // TODO: remove
  console.log("isAuth", isAuth);
  if (isAuth) {
    await saveDestinations({
      variables: {
        input: {
          userId: userInfoData!.getUserInfo.id,
          destinationIds: [dest],
        },
      },
    });
    console.log("saving destinations to db");
    await userInfoRefetch();
  } else {
    globalStore.addDestination(dest);
  }
};
