import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import Company from "./company";
import Job from "./job";
import { catchAsyncGQl } from "../lib/CatchAsync";

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "companies", key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    deletedAt: { type: DataTypes.DATE },
  },
  { sequelize, modelName: "user", tableName: "users", paranoid: true }
);

User.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(User, { foreignKey: "companyId" });
User.addHook(
  "beforeBulkDestroy",
  catchAsyncGQl(async (user) => {
    await Job.destroy({ where: { companyId: (user as any).where.companyId } });
  })
);

export default User;
