import {
  DataTypes,
  type Model,
  type ModelAttributes,
  type Optional,
} from "sequelize";
import { DestinationId } from "../types.ts";

export interface IUserSchemeAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  saved_destinations: DestinationId[];
}

export interface IUserSchemeInput
  extends Optional<
    IUserSchemeAttributes,
    "id" | "role" | "created_at" | "saved_destinations"
  > {}

export interface IUserSchemeInstance
  extends Model<IUserSchemeAttributes, IUserSchemeInput>,
    IUserSchemeAttributes {}

export const userScheme: ModelAttributes<
  Model<IUserSchemeAttributes, IUserSchemeInput>,
  IUserSchemeAttributes
> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  saved_destinations: {
    type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(DestinationId))),
    defaultValue: [],
  },
};
