import { useMutation } from "@apollo/client/react";
import { LOGIN_SCHEME } from "../api";
import { IMutateLoginResponse } from "../types";

export const useMutateLogin = () =>
  useMutation<IMutateLoginResponse>(LOGIN_SCHEME);
