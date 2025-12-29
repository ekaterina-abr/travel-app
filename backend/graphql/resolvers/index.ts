import { authResolver } from "./auth.ts";
import { dateResolver } from "./date.ts";
import { destinationsResolver } from "./destinations.ts";
import { enumsResolver } from "./enums.ts";

export const resolvers = [
  dateResolver,
  enumsResolver,
  authResolver,
  destinationsResolver,
];
