import type { Request, Response } from "express";
import Student from "../models/Student";
import User, { UserRole } from "../models/User";
import { sendResponse } from "../middlewares/errorHandler";
import { Op } from "sequelize";

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
	const { name, phone, password, faculty_id, level_id } = req.body;
	try {
		// check if the user already exists with the same phone
		const user = await User.findOne({
			where: {
				phone,
			},
		});
		if (user) {
			return sendResponse(res, "رقم الهاتف موجود بالفعل");
		}

		const newUser = await User.create({
			name,
			phone,
			role: UserRole.STUDENT,
			password,
		});
		if (!newUser) {
			return sendResponse(res, "المستخدم غير موجود");
		}

		const student = await Student.create({
			faculty_id,
			level_id,
			user_id: newUser.id,
		});
		return sendResponse(res, "تم إنشاء الطالب بنجاح", student);
	} catch (error) {
		return sendResponse(res, "خطأ في إنشاء الطالب", error);
	}
};

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
	const { search, page, limit } = req.query;
	try {
		const pageNumber = Number.parseInt(page as string, 10) || 1;
		const pageSize = Number.parseInt(limit as string, 10) || 10;
		const offset = (pageNumber - 1) * pageSize;

		const { count: totalStudents, rows: students } =
			await Student.findAndCountAll({
				include: [
					{
						model: User,

						where: {
							name: {
								[Op.like]: `%${search}%`,
							},
						},
					},
				],
				order: [["createdAt", "DESC"]],
				limit: pageSize,
				offset: offset,
			});

		const totalPages = Math.ceil(totalStudents / pageSize);

		return sendResponse(res, "تم جلب الطلاب بنجاح", {
			students,
			totalPages,
			currentPage: pageNumber,
		});
	} catch (error) {
		return sendResponse(res, "خطأ في جلب الطلاب", error);
	}
};

// Get a single student by ID
export const getStudentById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const student = await Student.findByPk(id, {
			include: [{ model: User, attributes: ["name", "phone", "password"] }],
		});
		if (!student) {
			return sendResponse(res, "الطالب غير موجود");
		}
		return sendResponse(res, "تم جلب الطالب بنجاح", student);
	} catch (error) {
		return sendResponse(res, "خطأ في جلب الطالب", error);
	}
};

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, phone, password, faculty_id, level_id } = req.body;
	try {
		const student = await Student.findByPk(id);
		if (!student) {
			return sendResponse(res, "الطالب غير موجود");
		}

		student.faculty_id = faculty_id;
		student.level_id = level_id;

		const user = await User.findByPk(student.user_id);
		if (!user) {
			return sendResponse(res, "المستخدم غير موجود");
		}

		user.name = name;
		user.phone = phone;
		user.password = password;
		await user.save();
		await student.save();

		return sendResponse(res, "تم تحديث الطالب بنجاح", student);
	} catch (error) {
		return sendResponse(res, "خطأ في تحديث الطالب", error);
	}
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const student = await Student.findByPk(id);
		if (!student) {
			return sendResponse(res, "الطالب غير موجود");
		}

		await student.destroy();
		await User.destroy({ where: { id: student.user_id } });
		return sendResponse(res, "تم حذف الطالب بنجاح");
	} catch (error) {
		return sendResponse(res, "خطأ في حذف الطالب", error);
	}
};
