import { Router } from "express";
import {
	getAllCourses,
	getDoctorCourses,
	getDoctors,
	getTopCourses,
	getTopDoctors,
} from "../controllers/home"; // Import the controller functions

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /all-courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Home]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/all-courses", getAllCourses); // Define the route for getting all courses

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get top courses
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Top courses retrieved successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       image:
 *                         type: string
 *                       doctor_name:
 *                         type: string
 *                       doctor_image:
 *                         type: string
 *                       doctor_job_title:
 *                         type: string
 *                       price:
 *                         type: string
 *                       no_of_lectures:
 *                         type: integer
 *                       no_of_documents:
 *                         type: integer
 *                       no_of_students:
 *                         type: integer
 *       500:
 *         description: Error fetching top courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.get("/courses", getTopCourses);

/**
 * @swagger
 * /all-doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       doctor_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       no_of_courses:
 *                         type: integer
 *                       job_title:
 *                         type: string
 *       500:
 *         description: Error fetching doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.get("/all-doctors", getDoctors);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get top doctors
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Top doctors retrieved successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       doctor_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       job_title:
 *                         type: string
 *                       no_of_courses:
 *                         type: integer
 *                       no_of_students:
 *                         type: integer
 *       500:
 *         description: Error fetching top doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.get("/doctors", getTopDoctors);

/**
 * @swagger
 * /doctor-courses/{doctor_id}:
 *   get:
 *     summary: Get doctor courses
 *     tags: [Home]
 *     parameters:
 *       - name: doctor_id
 *         in: path
 *         description: ID of the doctor
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Doctor courses retrieved successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       image:
 *                         type: string
 *                       doctor_name:
 *                         type: string
 *                       doctor_image:
 *                         type: string
 *                       doctor_job_title:
 *                         type: string
 *                       price:
 *                         type: string
 *                       no_of_lectures:
 *                         type: integer
 *                       no_of_documents:
 *                         type: integer
 *       500:
 *         description: Error fetching doctor courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
router.get("/doctor-courses/:doctor_id", getDoctorCourses);

export default router;
