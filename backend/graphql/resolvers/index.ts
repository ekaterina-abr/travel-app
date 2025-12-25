import { authResolver } from "./auth.ts";
import { dateResolver } from "./date.ts";

export const resolvers = [dateResolver, authResolver];
