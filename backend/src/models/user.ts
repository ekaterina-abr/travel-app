import {
  DataTypes,
  type Model,
  type ModelAttributes,
  type Optional,
} from "sequelize";
import { DestinationId } from "../types.js";

export interface IUserSchemeAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  savedDestinations: DestinationId[];
}

export interface IUserSchemeInput
  extends Optional<
    IUserSchemeAttributes,
    "id" | "role" | "createdAt" | "savedDestinations"
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  savedDestinations: {
    type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(DestinationId))),
    defaultValue: [],
  },
};
