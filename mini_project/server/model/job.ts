import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import Company from "./company";
import User from "./user";
import { catchAsyncGQl } from "../lib/CatchAsync";

class Job extends Model {}

Job.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "companies", key: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.DATE },
  },
  { sequelize, modelName: "job", paranoid: true }
);

Job.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Job, { foreignKey: "companyId" });
Job.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Job, { foreignKey: "userId" });

export default Job;
