export const userSchema = `#graphql
scalar Date

enum DestinationId {
  Egypt = "Egypt",
  Thailand = "Thailand",
  Turkey = "Turkey",
  UAE = "UAE"
}

type User {
  id: Int!
  name: String!
  email: String!
  password: String!
  role: String
  createdAt: Date
  savedDestinations: [DestinationId!]
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
  logout(): null
}

type Query {
  verifySession(): Session!
}
`;
