import type { Request, Response } from "express";
import Doctor from "../models/Doctor";
import User, { UserRole } from "../models/User";
import { sendResponse } from "../middlewares/errorHandler";
import { Op } from "sequelize";

// Create a new doctor
export const createDoctor = async (req: Request, res: Response) => {
	const { image, job_title, name, phone, password } = req.body;
	try {
		const user = await User.create({
			name,
			phone,
			role: UserRole.DOCTOR,
			password,
		});
		if (!user) {
			return sendResponse(res, "المستخدم غير موجود");
		}

		const doctor = await Doctor.create({ image, job_title, user_id: user.id });
		return sendResponse(res, "تم إنشاء الطبيب بنجاح", doctor);
	} catch (error) {
		return sendResponse(res, "خطأ في إنشاء الطبيب", error);
	}
};

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response) => {
	const { search, page, limit } = req.query;
	try {
		const pageNumber = Number.parseInt(page as string, 10) || 1;
		const pageSize = Number.parseInt(limit as string, 10) || 10;
		const offset = (pageNumber - 1) * pageSize;

		const { count: totalDoctors, rows: doctors } = await Doctor.findAndCountAll(
			{
				include: [
					{
						model: User,
						attributes: ["name", "phone", "password"],
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
			},
		);

		const totalPages = Math.ceil(totalDoctors / pageSize);

		return sendResponse(res, "تم جلب الأطباء بنجاح", {
			doctors,
			totalPages,
			currentPage: pageNumber,
		});
	} catch (error) {
		return sendResponse(res, "خطأ في جلب الأطباء", error);
	}
};

// Get a single doctor by ID
export const getDoctorById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const doctor = await Doctor.findByPk(id, {
			include: [{ model: User, attributes: ["name", "phone", "password"] }],
		});
		if (!doctor) {
			return sendResponse(res, "الطبيب غير موجود");
		}
		return sendResponse(res, "تم جلب الطبيب بنجاح", doctor);
	} catch (error) {
		return sendResponse(res, "خطأ في جلب الطبيب", error);
	}
};

// Update a doctor
export const updateDoctor = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { image, job_title, name, phone, password } = req.body;
	try {
		const doctor = await Doctor.findByPk(id);
		if (!doctor) {
			return sendResponse(res, "الطبيب غير موجود");
		}

		doctor.image = image;
		doctor.job_title = job_title;

		const user = await User.findByPk(doctor.user_id);
		if (!user) {
			return sendResponse(res, "المستخدم غير موجود");
		}

		user.name = name;
		user.phone = phone;
		user.password = password;
		await user.save();
		await doctor.save();

		return sendResponse(res, "تم تحديث الطبيب بنجاح", doctor);
	} catch (error) {
		return sendResponse(res, "خطأ في تحديث الطبيب", error);
	}
};

// Delete a doctor
export const deleteDoctor = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const doctor = await Doctor.findByPk(id);
		if (!doctor) {
			return sendResponse(res, "الطبيب غير موجود");
		}

		await doctor.destroy();
		await User.destroy({ where: { id: doctor.user_id } });
		return sendResponse(res, "تم حذف الطبيب بنجاح");
	} catch (error) {
		return sendResponse(res, "خطأ في حذف الطبيب", error);
	}
};
