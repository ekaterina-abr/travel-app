import { gql } from "@apollo/client";

export const VERIFY_SESSION_SCHEME = gql`
  query verifySession {
    verifySession {
      isAuth
      userId
    }
  }
`;

export const REGISTER_SCHEME = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      email
      token
    }
  }
`;

export const LOGIN_SCHEME = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      email
      token
    }
  }
`;
