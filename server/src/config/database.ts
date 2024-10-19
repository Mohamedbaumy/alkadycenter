import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
	dialect: "mysql",
	logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connection has been established successfully.");

		// Import and call seedData here instead of in the sync callback
		const { seedData } = await import("../seeders");
		await sequelize.sync({ force: false }).then(async () => {
			await seedData(sequelize);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		throw error;
	}
};

export default sequelize;
