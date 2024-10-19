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
		await sequelize.sync({ force: false });
		console.log("Database connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		throw error;
	}
};

export default sequelize;
