import { Router } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import {
	createDoctor,
	getAllDoctors,
	getDoctorById,
	updateDoctor,
	deleteDoctor,
} from "../controllers/doctor";

const router = Router();

router.post(
	"/",
	[
		body("name").isString().notEmpty().withMessage("Name is required"),
		body("phone").isString().notEmpty().withMessage("Phone is required"),
		body("job_title")
			.isString()
			.notEmpty()
			.withMessage("Job title is required"),
		validateRequest,
	],
	createDoctor,
);

router.get("/", getAllDoctors);

router.get(
	"/:id",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	getDoctorById,
);

router.put(
	"/:id",
	[
		param("id").isInt().withMessage("ID must be an integer"),
		body("name").isString().notEmpty().withMessage("Name is required"),
		body("phone").isString().notEmpty().withMessage("Phone is required"),
		body("job_title")
			.isString()
			.notEmpty()
			.withMessage("Job title is required"),
		validateRequest,
	],
	updateDoctor,
);

router.delete(
	"/:id",
	[param("id").isInt().withMessage("ID must be an integer"), validateRequest],
	deleteDoctor,
);

// ... existing code ...
export default router;
