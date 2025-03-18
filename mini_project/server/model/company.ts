import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";

class Company extends Model {}

Company.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  { sequelize, modelName: "company", tableName: "companies" }
);

export default Company;
