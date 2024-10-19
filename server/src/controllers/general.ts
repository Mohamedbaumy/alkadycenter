import Faculty from "../models/Faculty";
import { sendResponse } from "../middlewares/errorHandler";
import type { Request, Response } from "express";
import Level from "../models/Level";

export const getAllFaculties = async (req: Request, res: Response) => {
	try {
		const faculties = await Faculty.findAll();
		sendResponse(res, "all faculties", faculties);
	} catch (error) {
		sendResponse(res, "Error fetching faculties", error);
	}
};

export const getLevelsOfFaculty = async (req: Request, res: Response) => {
	try {
		const { faculty_id } = req.query;
		const levels = await Level.findAll({
			where: { faculty_id: Number(faculty_id) },
			attributes: ["id", "name"],
		});
		sendResponse(res, "levels of faculty", levels);
	} catch (error) {
		sendResponse(res, "Error fetching levels of faculty", error);
	}
};
