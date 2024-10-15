import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

export { validateRequest };
