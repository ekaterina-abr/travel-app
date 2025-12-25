import { buildSchema } from "graphql";
import { userSchema } from "./user.ts";

export const typeDefs = [buildSchema(userSchema)];
