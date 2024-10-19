import type { Request, Response, NextFunction } from "express";

export const sendResponse = (
	res: Response,
	msg: string,
	data: unknown = null,
) => {
	return res.status(200).json({ status: true, msg, data, is_authorized: true });
};

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	sendResponse(res, "Something broke!", err);
};
