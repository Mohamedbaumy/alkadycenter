import { Router } from "express";
import { register, login, userProfile, adminLogin } from "../controllers/auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

/**
 * @swagger
 * /register:
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
 *                 example: "John Doe"
 *               phone_number:
 *                 type: string
 *                 example: "88888888888"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               level_id:
 *                 type: integer
 *                 example: 1
 *               faculty_id:
 *                 type: integer
 *                 example: 2
 *               platform:
 *                 type: string
 *                 example: "Android"
 *               manufacturer:
 *                 type: string
 *                 example: "Gulgowski, McLaughlin and D'Amore"
 *               model:
 *                 type: string
 *                 example: "Larkin LLC 6"
 *               device_id:
 *                 type: string
 *                 example: "f1c4cdc9-f135-47bf-bf74-17425c96dc31"
 *               notification_token:
 *                 type: string
 *                 example: "token123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     phone:
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
 *                 is_authorized:
 *                   type: boolean
 *       200:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error registering user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */
router.post(
	"/register",
	[
		body("name").isString().notEmpty().withMessage("Name is required"),
		body("phone_number")
			.isString()
			.isLength({ min: 10, max: 15 })
			.withMessage("Phone number must be between 10 and 15 characters"),
		body("password")
			.isString()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
		body("level_id").isInt().withMessage("Level ID must be an integer"),
		body("faculty_id").isInt().withMessage("Faculty ID must be an integer"),
		body("device_id")
			.optional()
			.isString()
			.withMessage("Device ID must be a string"),

		validateRequest,
	],
	register,
);

/**
 * 
 * name: "Test Student",
    phone: "01100000000",
    password: hashedPassword,
    role: UserRole.STUDENT,
    platform: "Android",
    manufacturer: "Gulgowski, McLaughlin and D'Amore",
    model: "Larkin LLC 6",
    device_id: "f1c4cdc9-f135-47bf-bf74-17425c96dc31",
    notification_token: faker.string.alphanumeric(30),
 */

/**
 * @swagger
 * /login:
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
 *               phone_number:
 *                 type: string
 *                 example: "01100000000"
 *               password:
 *                 type: string
 *                 example: "01000000000"
 *               device_id:
 *                 type: string
 *                 example: "f1c4cdc9-f135-47bf-bf74-17425c96dc31"
 *               platform:
 *                 type: string
 *                 example: "Android"
 *               manufacturer:
 *                 type: string
 *                 example: "Gulgowski, McLaughlin and D'Amore"
 *               model:
 *                 type: string
 *                 example: "Larkin LLC 6"
 *               notification_token:
 *                 type: string
 *                 example: "token123"
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
 *                 expires_in:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     student_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       403:
 *         description: Device not recognized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     error_in_device_id_only:
 *                       type: boolean
 *                     error_in_platform:
 *                       type: boolean
 *                     error_in_manufacturer:
 *                       type: boolean
 *                     error_in_model:
 *                       type: boolean
 *       500:
 *         description: Error logging in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */
router.post(
	"/login",
	[
		body("phone_number")
			.isString()
			.isLength({ min: 10, max: 15 })
			.withMessage("phone_number must be between 10 and 15 characters"),
		body("password")
			.isString()
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
		body("device_id")
			.optional()
			.isString()
			.withMessage("Device ID must be a string"),
		body("platform").isString().notEmpty().withMessage("Platform is required"),
		body("manufacturer")
			.isString()
			.notEmpty()
			.withMessage("Manufacturer is required"),
		body("model").isString().notEmpty().withMessage("Model is required"),
		body("notification_token")
			.isString()
			.notEmpty()
			.withMessage("Notification Token is required"),
		validateRequest,
	],
	login,
);

/**
 * @swagger
 * /user-profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
router.get("/user-profile", userProfile);

/**
 * @swagger
 * /auth/admin-login:
 *   post:
 *     summary: Admin login
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
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 expires_in:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error logging in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */
router.post("/auth/admin-login", adminLogin);

export default router;
