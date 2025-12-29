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

export const DESTINATIONS_SCHEME = gql`
  query destinations {
    destinations {
      id
      title
      description
      iso_code
      saved_times
    }
  }
`;

export const LOGOUT_SCHEME = gql`
  mutation logout {
    logout {
      isAuth
      userId
    }
  }
`;
