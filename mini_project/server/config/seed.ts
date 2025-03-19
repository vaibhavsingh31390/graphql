import sequelize from "./config";
import { Company, Job, User } from "../model";
import { faker } from "@faker-js/faker";

export const seedDatabase = async () => {
  try {
    console.log("Dropping and recreating tables...");
    await sequelize.sync({ force: true });
    console.log("Database reset complete. Seeding data...");

    const companies = await Company.bulkCreate(
      Array.from({ length: 5 }).map(() => ({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
      }))
    );

    for (const company of companies) {
      const users = await User.bulkCreate(
        Array.from({ length: 2 }).map(() => ({
          companyId: company.dataValues.id,
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: faker.internet.password(),
        }))
      );

      await Job.bulkCreate(
        Array.from({ length: 3 }).map(() => ({
          companyId: company.dataValues.id,
          userId: faker.helpers.arrayElement(users).dataValues.id,
          title: faker.person.jobTitle(),
          description: faker.lorem.sentence(),
        }))
      );
    }

    console.log("Seeding complete.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close();
  }
};
