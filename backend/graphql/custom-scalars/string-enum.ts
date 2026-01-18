import { GraphQLScalarType } from "graphql";

const makeCustomEnumScalar = (
  name: string,
  description: string,
  validValues: string[]
) => {
  const checkValue = (value: unknown) => {
    const coerced = String(value);
    if (!validValues.includes(coerced)) {
      throw new TypeError(`${coerced} is not a valid value for scalar ${name}`);
    }
    return coerced;
  };

  return new GraphQLScalarType({
    name,
    description,
    serialize: checkValue,
    parseValue: checkValue,
    parseLiteral: (ast) => checkValue(ast),
  });
};

export const DestinationIdScalar = makeCustomEnumScalar(
  "DestinationId",
  "id of destination as string",
  ["Egypt", "Thailand", "Turkey", "UAE"]
);
