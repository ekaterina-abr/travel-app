import { DataTypes, type Model, type ModelAttributes } from "sequelize";
import { DestinationId } from "../types.ts";

export interface IDestinationSchemeAttributes {
  id: DestinationId;
  title: string;
  description: string;
  isoCode: string;
  savedTimes: number;
}

export interface IDestinationSchemeInput extends IDestinationSchemeAttributes {}

export interface IDestinationSchemeInstance
  extends Model<IDestinationSchemeAttributes, IDestinationSchemeInput>,
    IDestinationSchemeAttributes {}

export const destinationScheme: ModelAttributes<
  Model<IDestinationSchemeAttributes, IDestinationSchemeInput>,
  IDestinationSchemeAttributes
> = {
  id: {
    type: DataTypes.ENUM(...Object.values(DestinationId)),
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  isoCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  savedTimes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
};
