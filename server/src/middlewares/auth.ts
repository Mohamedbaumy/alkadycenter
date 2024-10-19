import type { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import { sendResponse } from "./errorHandler";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Extend the Request interface to include the user property
declare global {
	interface UserRequest extends Request {
		user?: User;
	}
}

export const authenticate = async (
	req: UserRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return sendResponse(res, "No token provided", null, false);
	}

	try {
		const decoded: any = verify(token, JWT_SECRET);
		const userId = decoded.id;

		const user = await User.findOne({ where: { id: userId } });
		if (!user) {
			return sendResponse(res, "User not found", null, false);
		}

		req.user = user;
		next();
	} catch (error) {
		return sendResponse(res, "Invalid token", null, false);
	}
};
