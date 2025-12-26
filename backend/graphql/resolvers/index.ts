import { authResolver } from "./auth.ts";
import { dateResolver } from "./date.ts";
import { enumsResolver } from "./enums.ts";
import { nullResolver } from "./null.ts";

export const resolvers = [
  dateResolver,
  enumsResolver,
  nullResolver,
  authResolver,
];
