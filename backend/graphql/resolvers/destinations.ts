import { GraphQLError } from "graphql";
import { Op } from "sequelize";
import { Destination, User } from "../../models/index.ts";
import type { DestinationId, IApolloContext } from "../../types.ts";

export interface ISaveDestinationsArgs {
  input: {
    userId: number;
    destinationIds: DestinationId[];
  };
}

export interface IUnsaveDestinationArgs {
  input: {
    userId: number;
    destinationId: DestinationId;
  };
}

export const destinationsResolver = {
  Query: {
    async destinations(parent: any, args: null, context: IApolloContext) {
      return await Destination.findAll();
    },
  },
  Mutation: {
    async saveDestinations(
      parent: any,
      args: ISaveDestinationsArgs,
      context: IApolloContext
    ) {
      const { userId, destinationIds } = args.input;
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        throw new GraphQLError(`Пользователя с id=${userId} не существует`);
      }

      user.saved_destinations.concat(destinationIds);
      const userUpdated = await user.save();

      await Destination.increment("saved_times", {
        where: { id: { [Op.or]: destinationIds } },
      });
      return { userId: userUpdated.id, savedDestinations: destinationIds };
    },
    async unsaveDestination(
      parent: any,
      args: IUnsaveDestinationArgs,
      context: IApolloContext
    ) {
      const { userId, destinationId } = args.input;
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        throw new GraphQLError(`Пользователя с id=${userId} не существует`);
      }

      user.saved_destinations.filter((ids) => ids !== destinationId);
      const userUpdated = await user.save();

      await Destination.decrement("saved_times", {
        where: { id: destinationId },
      });
      return {
        userId: userUpdated.id,
        unsavedDestination: destinationId,
      };
    },
  },
};
