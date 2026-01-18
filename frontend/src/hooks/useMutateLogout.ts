import { useMutation } from "@apollo/client/react";
import { LOGOUT_SCHEME } from "../api";
import { IMutateLogoutResponse } from "../types";

export const useMutateLogout = () =>
  useMutation<IMutateLogoutResponse>(LOGOUT_SCHEME);
