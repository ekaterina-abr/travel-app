import { buildSchema } from "graphql";
import { userSchema } from "./user.ts";
import { destinationsSchema } from "./destinations.ts";

export const typeDefs = [
  buildSchema(userSchema),
  buildSchema(destinationsSchema),
];
