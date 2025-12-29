import { useMutation } from "@apollo/client/react";
import { REGISTER_SCHEME } from "../api";
import { IMutateRegisterResponse } from "../types";

export const useMutateRegister = () =>
  useMutation<IMutateRegisterResponse>(REGISTER_SCHEME);
