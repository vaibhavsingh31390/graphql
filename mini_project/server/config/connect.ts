import sequelize from "./config";
import { seedDatabase } from "./seed";

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await sequelize
      .sync({ alter: true })

      .then(() => {
        console.log("Tables synced successfully!");
      })
      .catch((error) => {
        console.error("Error syncing tables:", error);
      });
    // process.env.APP_ENV === "dev" ? await seedDatabase() : false;
  } catch (error) {
    console.error("Database connection or sync failed:", error);
  }
};

export default connectDB;
