import "dotenv/config";
import { type ModelStatic, type Options, Sequelize } from "sequelize";
import config from "../config/config.ts";
import { type IUserSchemeInstance, userScheme } from "./user.ts";
import {
  destinationScheme,
  type IDestinationSchemeInstance,
} from "./destination.ts";

const db: Record<string, ModelStatic<any> | Sequelize | typeof Sequelize> = {};
const env = process.env.NODE_ENV || "development";
const envConfig = config[env];

const additionalOptions: Options = {
  quoteIdentifiers: false,
  define: { timestamps: false },
};

if (!envConfig) {
  throw new Error("Config is not provided");
}

let sequelize;
if (envConfig.url) {
  sequelize = new Sequelize(envConfig.url, {
    ...envConfig,
    ...additionalOptions,
  });
} else {
  sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password,
    { ...envConfig, ...additionalOptions }
  );
}

const User = sequelize.define<IUserSchemeInstance>("User", userScheme);
const Destination = sequelize.define<IDestinationSchemeInstance>(
  "Destination",
  destinationScheme
);

db.User = User;
db.Destination = Destination;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db, User, Destination };
