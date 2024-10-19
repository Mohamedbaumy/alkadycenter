import type { Request, Response } from "express";
import Faculty from "../models/Faculty";
import Level from "../models/Level";
import { sendResponse } from "../middlewares/errorHandler";
import { Op } from "sequelize";

// Create a new faculty
export const createFaculty = async (req: Request, res: Response) => {
	const { name } = req.body;
	try {
		const existingFaculty = await Faculty.findOne({ where: { name } });
		if (existingFaculty) {
			return sendResponse(res, "الكلية موجودة بالفعل");
		}

		const faculty = await Faculty.create({ name });
		return sendResponse(res, "تم إنشاء الكلية بنجاح", faculty);
	} catch (error) {
		return sendResponse(res, "خطأ في إنشاء الكلية", error);
	}
};

// Get all faculties
export const getAllFaculties = async (req: Request, res: Response) => {
	const { search, page, limit } = req.query;
	try {
		const pageNumber = Number.parseInt(page as string, 10) || 1;
		const pageSize = Number.parseInt(limit as string, 10) || 10;
		const offset = (pageNumber - 1) * pageSize;

		const whereClause: any = {};
		if (search) {
			whereClause.name = { [Op.like]: `%${search}%` };
		}

		const { count: totalFaculties, rows: faculties } =
			await Faculty.findAndCountAll({
				where: whereClause,
				include: [
					{
						model: Level,
					},
				],
				order: [["name", "ASC"]],
				limit: pageSize,
				offset: offset,
			});

		const totalPages = Math.ceil(totalFaculties / pageSize);

		return sendResponse(res, "تم جلب الكليات بنجاح", {
			faculties,
			totalPages,
			currentPage: pageNumber,
		});
	} catch (error) {
		return sendResponse(res, "خطأ في جلب الكليات", error);
	}
};

// Get a single faculty by ID
export const getFacultyById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const faculty = await Faculty.findByPk(id);
		if (!faculty) {
			return sendResponse(res, "الكلية غير موجودة");
		}
		return sendResponse(res, "تم جلب الكلية بنجاح", faculty);
	} catch (error) {
		return sendResponse(res, "خطأ في جلب الكلية", error);
	}
};

// Update a faculty
export const updateFaculty = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const faculty = await Faculty.findByPk(id);
		if (!faculty) {
			return sendResponse(res, "الكلية غير موجودة");
		}

		faculty.name = name;
		await faculty.save();

		return sendResponse(res, "تم تحديث الكلية بنجاح", faculty);
	} catch (error) {
		return sendResponse(res, "خطأ في تحديث الكلية", error);
	}
};

// Delete a faculty
export const deleteFaculty = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const faculty = await Faculty.findByPk(id);
		if (!faculty) {
			return sendResponse(res, "الكلية غير موجودة");
		}

		await faculty.destroy();
		return sendResponse(res, "تم حذف الكلية بنجاح");
	} catch (error) {
		return sendResponse(res, "خطأ في حذف الكلية", error);
	}
};

// Create a new level for a faculty
export const createLevel = async (req: Request, res: Response) => {
	const { faculty_id } = req.params;
	const { name } = req.body;
	try {
		const faculty = await Faculty.findByPk(faculty_id);
		if (!faculty) {
			return sendResponse(res, "الكلية غير موجودة", { name, faculty_id });
		}

		const level = await Level.create({ name, faculty_id: Number(faculty_id) });
		return sendResponse(res, "تم إنشاء المستوى بنجاح", level);
	} catch (error) {
		return sendResponse(res, "خطأ في إنشاء المستوى", error);
	}
};

// Get all levels for a faculty
export const getLevels = async (req: Request, res: Response) => {
	const { faculty_id } = req.params;
	try {
		const faculty = await Faculty.findByPk(faculty_id, {
			include: [{ model: Level }],
		});
		if (!faculty) {
			return sendResponse(res, "الكلية غير موجودة");
		}

		return sendResponse(res, "تم جلب المستويات بنجاح", faculty.Levels);
	} catch (error) {
		return sendResponse(res, "خطأ في جلب المستويات", error);
	}
};

// Update a level
export const updateLevel = async (req: Request, res: Response) => {
	const { level_id } = req.params;
	const { name } = req.body;
	try {
		const level = await Level.findByPk(level_id);
		if (!level) {
			return sendResponse(res, "المستوى غير موجود");
		}

		level.name = name;
		await level.save();

		return sendResponse(res, "تم تحديث المستوى بنجاح", level);
	} catch (error) {
		return sendResponse(res, "خطأ في تحديث المستوى", error);
	}
};

// Delete a level
export const deleteLevel = async (req: Request, res: Response) => {
	const { level_id } = req.params;
	try {
		const level = await Level.findByPk(level_id);
		if (!level) {
			return sendResponse(res, "المستوى غير موجود");
		}

		await level.destroy();
		return sendResponse(res, "تم حذف المستوى بنجاح");
	} catch (error) {
		return sendResponse(res, "خطأ في حذف المستوى", error);
	}
};
