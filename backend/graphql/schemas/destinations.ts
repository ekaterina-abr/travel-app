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
`;
