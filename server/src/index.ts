import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import { connectToDatabase } from "./config/database";
import * as models from "./models";
import routes from "./routes";

console.log(models);

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.use(errorHandler);

connectToDatabase()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.error(
			"Failed to connect to the database. Server not started.",
			error,
		);
		process.exit(1);
	});

export default app;
