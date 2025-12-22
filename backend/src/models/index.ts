import "dotenv/config";
import { Sequelize } from "sequelize";
import { userScheme, type IUserSchemeInstance } from "./user.js";
import {
  destinationScheme,
  type IDestinationSchemeInstance,
} from "./destination.js";

const sequelize = new Sequelize(process.env.DATABASE_URL!);

const User = sequelize.define<IUserSchemeInstance>("User", userScheme);
const Destination = sequelize.define<IDestinationSchemeInstance>(
  "Destination",
  destinationScheme
);

(async () => {
  await sequelize.sync({ alter: true });
})();

export { sequelize, User, Destination };
