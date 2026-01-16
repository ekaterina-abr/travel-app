export const destinationsSchema = `#graphql
scalar DestinationId

type Destination {
  id: DestinationId!
  title: String!
  description: String
  iso_code: String!
  saved_times: Int!
}

type Query {
  destinations: [Destination!]!
}

input SaveDestinationsInput {
  userId: Int!
  destinationIds: [DestinationId!]!
}

type SaveDestinationsResponse {
  userId: Int!
  savedDestinations: [DestinationId!]!
}

input UnsaveDestinationInput {
  userId: Int!
  destinationId: DestinationId!
}

type UnsaveDestinationResponse {
  userId: Int!
  unsavedDestination: DestinationId!
}

type Mutation {
  saveDestinations(input: SaveDestinationsInput!): SaveDestinationsResponse
  unsaveDestination(input: UnsaveDestinationInput!): UnsaveDestinationResponse
}
`;
