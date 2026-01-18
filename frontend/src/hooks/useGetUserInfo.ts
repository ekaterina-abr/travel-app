import { useQuery } from "@apollo/client/react";
import { GET_USER_INFO_SCHEME } from "../api";
import { IGetUserInfoResponse } from "../types";

export const useGetUserInfo = () =>
  useQuery<IGetUserInfoResponse>(GET_USER_INFO_SCHEME);
