export const userSchema = `#graphql
scalar Date
scalar DestinationId

type User {
  id: Int!
  name: String!
  email: String!
  password: String!
  role: String
  created_at: Date
  saved_destinations: [DestinationId!]
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

type RegisterResponse {
  id: Int!
  name: String!
  email: String!
  token: String!
}

type LoginResponse {
  id: Int!
  name: String!
  email: String!
  token: String!
}

type Session {
  isAuth: Boolean!
  userId: Int
}

type Mutation {
  register(input: RegisterInput!): RegisterResponse
  login(input: LoginInput!): LoginResponse
  logout: Session!
}

type Query {
  verifySession: Session!
}
`;
