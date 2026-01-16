import { gql } from "@apollo/client";

export const VERIFY_SESSION_SCHEME = gql`
  query verifySession {
    verifySession {
      isAuth
      userId
    }
  }
`;

export const GET_USER_INFO_SCHEME = gql`
  query getUserInfo {
    getUserInfo {
      id
      name
      email
      role
      created_at
      saved_destinations
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

export const SAVE_DESTINATIONS_SCHEME = gql`
  mutation saveDestinations($input: SaveDestinationsInput!) {
    saveDestinations(input: $input) {
      userId
      savedDestinations
    }
  }
`;

export const UNSAVE_DESTINATION_SCHEME = gql`
  mutation unsaveDestination($input: UnsaveDestinationInput!) {
    unsaveDestination(input: $input) {
      userId
      unsavedDestination
    }
  }
`;
