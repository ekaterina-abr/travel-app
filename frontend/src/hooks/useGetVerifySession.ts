import { useQuery } from "@apollo/client/react";
import { VERIFY_SESSION_SCHEME } from "../api";
import { IVerifySessionResponse } from "../types";

export const useGetVerifySession = () =>
  useQuery<IVerifySessionResponse>(VERIFY_SESSION_SCHEME, {
    fetchPolicy: "network-only",
  });
