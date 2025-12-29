import { Destination } from "../../models/index.ts";
import type { IApolloContext } from "../../types.ts";

export const destinationsResolver = {
  Query: {
    async destinations(parent: any, args: null, context: IApolloContext) {
      return await Destination.findAll();
    },
  },
};
