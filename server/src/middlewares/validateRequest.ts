import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { sendResponse } from "./errorHandler";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return sendResponse(res, "Invalid request", errors.array(), false);
	}
	next();
};

export { validateRequest };
