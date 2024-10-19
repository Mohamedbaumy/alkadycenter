import { Router } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import {
	createFaculty,
	getAllFaculties,
	getFacultyById,
	updateFaculty,
	deleteFaculty,
	createLevel,
	updateLevel,
	deleteLevel,
} from "../controllers/faculty";

const router = Router();

router.post(
	"/",
	[
		body("name").isString().notEmpty().withMessage("Name is required"),
		validateRequest,
	],
	createFaculty,
);

router.get("/", getAllFaculties);

router.get(
	"/:id",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	getFacultyById,
);

router.put(
	"/:id",
	[
		param("id").isInt().withMessage("ID must be an integer"),
		body("name").isString().notEmpty().withMessage("Name is required"),
		validateRequest,
	],
	updateFaculty,
);

router.delete(
	"/:id",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	deleteFaculty,
);

router.post(
	"/:faculty_id/level",
	[
		param("faculty_id").isInt().withMessage("ID must be an integer"),
		body("name").isString().notEmpty().withMessage("Name is required"),
		validateRequest,
	],
	createLevel,
);

router.put(
	"/:id/level/:level_id",
	[
		param("id").isInt().withMessage("ID must be an integer"),
		param("level_id").isInt().withMessage("Level ID must be an integer"),
		body("name").isString().notEmpty().withMessage("Name is required"),
		validateRequest,
	],
	updateLevel,
);

router.delete(
	"/:id/level/:level_id",
	[
		param("id").isInt().withMessage("ID must be an integer"),
		param("level_id").isInt().withMessage("Level ID must be an integer"),
		validateRequest,
	],
	deleteLevel,
);

export default router;
