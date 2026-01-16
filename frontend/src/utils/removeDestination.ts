import { useMutation } from "@apollo/client/react";
import {
  IGetUserInfoResponse,
  IMutateUnsaveDestinationResponse,
} from "../types";
import { ApolloCache, ApolloClient } from "@apollo/client";
import { GlobalStore } from "../stores";

interface IArgs {
  dest: string;
  isAuth: boolean;
  unsaveDestination: useMutation.MutationFunction<
    IMutateUnsaveDestinationResponse,
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

export const removeDestination = async ({
  dest,
  isAuth,
  unsaveDestination,
  globalStore,
  userInfoData,
  userInfoRefetch,
}: IArgs) => {
  if (isAuth) {
    await unsaveDestination({
      variables: {
        input: {
          userId: userInfoData!.getUserInfo.id,
          destinationId: dest,
        },
      },
    });
    await userInfoRefetch();
  } else {
    globalStore.removeDestination(dest);
  }
};
