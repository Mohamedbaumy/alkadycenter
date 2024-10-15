import { Router } from "express";
import { register, login } from "../controllers/auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               device_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                     device_id:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: User already exists
 *       500:
 *         description: Error registering user
 */
router.post(
	"/register",
	[
		body("name").isString().notEmpty().withMessage("Name is required"),
		body("phone")
			.isString()
			.isLength({ min: 10, max: 15 })
			.withMessage("Phone must be between 10 and 15 characters"),
		body("password")
			.isString()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
		body("role").isString().notEmpty().withMessage("Role is required"),
		body("device_id")
			.optional()
			.isString()
			.withMessage("Device ID must be a string"),
		validateRequest,
	],
	register,
);

/**
 * @swagger
 * /auth/login55:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               device_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       403:
 *         description: Device not recognized
 *       500:
 *         description: Error logging in
 */
router.post(
	"/login",
	[
		body("phone")
			.isString()
			.isLength({ min: 10, max: 15 })
			.withMessage("Phone must be between 10 and 15 characters"),
		body("password")
			.isString()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
		body("device_id")
			.optional()
			.isString()
			.withMessage("Device ID must be a string"),
		validateRequest,
	],
	login,
);

export default router;
