import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "AlkadyCenter API",
			version: "1.0.0",
			description: "API documentation for AlkadyCenter",
		},
		servers: [
			{
				url:
					process.env.NODE_ENV === "development"
						? "http://localhost:3000/api"
						: "https://alqadi.online/api",
			},
		],
	},
	apis: ["./src/routes/*.ts"], // path to API docs
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
