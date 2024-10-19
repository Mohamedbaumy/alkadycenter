import { Router } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import {
	createStudent,
	getAllStudents,
	getStudentById,
	updateStudent,
	deleteStudent,
	resetStudentDeviceInfo,
	addCourseToStudent,
} from "../controllers/student";

const router = Router();

router.post(
	"/",
	[
		body("name").isString().notEmpty().withMessage("Name is required"),
		body("phone").isString().notEmpty().withMessage("Phone is required"),
		body("password").isString().notEmpty().withMessage("Password is required"),
		body("faculty_id").isInt().withMessage("Faculty ID must be an integer"),
		body("level_id").isInt().withMessage("Level ID must be an integer"),
		validateRequest,
	],
	createStudent,
);

router.get("/", getAllStudents);

router.get(
	"/:id",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	getStudentById,
);

router.put(
	"/:id",
	[
		param("id").isInt().withMessage("ID must be an integer"),
		body("name").isString().notEmpty().withMessage("Name is required"),
		body("phone").isString().notEmpty().withMessage("Phone is required"),
		body("password").isString().notEmpty().withMessage("Password is required"),
		body("faculty_id").isInt().withMessage("Faculty ID must be an integer"),
		body("level_id").isInt().withMessage("Level ID must be an integer"),
		validateRequest,
	],
	updateStudent,
);

router.delete(
	"/:id",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	deleteStudent,
);

router.post(
	"/:id/reset-device-info",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	resetStudentDeviceInfo,
);

// Add a new route for adding a course to a student
router.post(
	"/:studentId/courses/:courseId",
	[
		param("studentId").isInt().withMessage("Student ID must be an integer"),
		param("courseId").isInt().withMessage("Course ID must be an integer"),
		validateRequest,
	],
	addCourseToStudent,
);

export default router;
