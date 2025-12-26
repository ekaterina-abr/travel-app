import { gql } from "@apollo/client";

export const VERIFY_SESSION_SCHEME = gql`
  query verifySession {
    verifySession {
      isAuth
      userId
    }
  }
`;
