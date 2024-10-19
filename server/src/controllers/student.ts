import type { Request, Response } from "express";
import Student from "../models/Student";
import User, { UserRole } from "../models/User";
import Course from "../models/Course";
import { sendResponse } from "../middlewares/errorHandler";
import { Op } from "sequelize";
import StudentCourse from "../models/StudentCourse";

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
					{
						model: StudentCourse,
						include: [{ model: Course }],
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
			include: [
				{ model: User, attributes: ["name", "phone", "password"] },
				{ model: Course },
			],
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

// Reset student device info
export const resetStudentDeviceInfo = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const student = await Student.findByPk(id);
		if (!student) {
			return sendResponse(res, "الطالب غير موجود");
		}

		const user = await User.findByPk(student.user_id);
		if (!user) {
			return sendResponse(res, "المستخدم غير موجود");
		}

		user.platform = "";
		user.manufacturer = "";
		user.model = "";
		user.device_id = "";
		user.notification_token = "";
		await user.save();

		return sendResponse(res, "تم إعادة تعيين معلومات الجهاز بنجاح");
	} catch (error) {
		return sendResponse(res, "خطأ في إعادة تعيين معلومات الجهاز", error);
	}
};

// Add a new function to add a course to a student
export const addCourseToStudent = async (req: Request, res: Response) => {
	const { studentId, courseId } = req.params;
	try {
		const student = await Student.findByPk(studentId);
		if (!student) {
			return sendResponse(res, "الطالب غير موجود");
		}

		const course = await Course.findByPk(courseId);
		if (!course) {
			return sendResponse(res, "المقرر غير موجود");
		}

		const [studentCourse, created] = await StudentCourse.findOrCreate({
			where: {
				student_id: studentId,
				course_id: courseId,
			},
		});

		if (created) {
			return sendResponse(res, "تم إضافة المقرر للطالب بنجاح");
		}
		return sendResponse(res, "المقرر مضاف بالفعل للطالب");
	} catch (error) {
		return sendResponse(res, "خطأ في إضافة المقرر للطالب", error);
	}
};
