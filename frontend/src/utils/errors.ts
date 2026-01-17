import { loginGraphqlErrors, registerGraphqlErrors } from "../api";

export const isEmailNotExistLoginError = (msg?: string) =>
  msg === loginGraphqlErrors.emailNotExist;

export const isWrongPasswordLoginError = (msg?: string) =>
  msg === loginGraphqlErrors.wrongPassword;

export const isUserExistsRegisterError = (msg?: string) =>
  msg === registerGraphqlErrors.userExists;
