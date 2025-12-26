import { GraphQLScalarType, Kind } from "graphql";

export const nullScalar = new GraphQLScalarType({
  name: "Null",
  description: "A custom scalar that represents the null value",
  serialize(value) {
    return null;
  },
  parseValue(value) {
    return null;
  },
  parseLiteral(ast) {
    return null;
  },
});
