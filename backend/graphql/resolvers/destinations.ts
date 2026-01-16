import { GraphQLError } from "graphql";
import { Op, Sequelize } from "sequelize";
import { db, Destination, User } from "../../models/index.ts";
import { DestinationId, type IApolloContext } from "../../types.ts";

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
      return await Destination.findAll({
        order: (db.sequelize as Sequelize).col("iso_code"),
      });
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

      const newDestinations = destinationIds.filter(
        (dest) => !user.saved_destinations.includes(dest)
      );
      const allDestinations = user.saved_destinations.concat(newDestinations);
      const userUpdated = await user.update({
        saved_destinations: allDestinations,
      });

      await Destination.increment("saved_times", {
        where: { id: { [Op.or]: newDestinations } },
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

      const filteredDestinations = [...user.saved_destinations].filter(
        (ids) => ids !== destinationId
      );
      const userUpdated = await user.update({
        saved_destinations: filteredDestinations,
      });

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
