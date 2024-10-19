import { Router } from "express";
import { getAllFaculties, getLevelsOfFaculty } from "../controllers/general"; // Import the controller function

const router = Router();

/**
 * @swagger
 * /faculties:
 *   get:
 *     summary: Get all faculties
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Faculties retrieved successfully
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
 *                       name:
 *                         type: string
 *       500:
 *         description: Error fetching faculties
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
router.get("/faculties", getAllFaculties); // Define the route for getting all faculties

/**
 * @swagger
 * /faculty/levels:
 *   get:
 *     summary: Get levels of a faculty
 *     tags: [General]
 *     parameters:
 *       - in: query
 *         name: faculty_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the faculty
 *     responses:
 *       200:
 *         description: Levels of the faculty retrieved successfully
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
 *                       name:
 *                         type: string
 *       500:
 *         description: Error fetching levels of faculty
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
router.get("/faculty/levels", getLevelsOfFaculty);

export default router;
