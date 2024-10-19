import type { Request, Response } from "express";
import User, { UserRole } from "../models/User";
import bcrypt from "bcryptjs";
import jwt, { verify } from "jsonwebtoken";
import Student from "../models/Student";
import { sendResponse } from "../middlewares/errorHandler";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response) => {
	const {
		name,
		phone_number,
		password,
		level_id,
		faculty_id,
		platform,
		manufacturer,
		model,
		device_id,
		notification_token,
	} = req.body;
	try {
		const existingUser = await User.findOne({ where: { phone: phone_number } });
		if (existingUser) {
			return sendResponse(res, "User already exists", null, false);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			phone: phone_number,
			password: hashedPassword,
			role: UserRole.STUDENT,
			platform,
			manufacturer,
			model,
			device_id,
			notification_token,
		});

		const student = await Student.create({
			user_id: user.id,
			level_id,
			faculty_id,
		});

		const student_with_user = await Student.findOne({
			where: { user_id: user.id },
			include: [User],
		});

		return sendResponse(
			res,
			"User registered successfully",
			student_with_user,
			true,
		);
	} catch (error) {
		return sendResponse(res, "Error registering user", error, false);
	}
};

export const login = async (req: Request, res: Response) => {
	const {
		phone_number,
		password,
		platform,
		manufacturer,
		model,
		device_id,
		notification_token,
	} = req.body;

	try {
		const user = await User.findOne({ where: { phone: phone_number } });
		if (!user) {
			return sendResponse(
				res,
				"رقم الهاتف او كلمة المرور غير صحيحة",
				null,
				false,
			);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return sendResponse(
				res,
				"رقم الهاتف او كلمة المرور غير صحيحة",
				null,
				false,
			);
		}

		if (
			!user.device_id ||
			user.device_id !== device_id ||
			user.platform !== platform ||
			user.manufacturer !== manufacturer ||
			user.model !== model
		) {
			return res.status(200).json({
				status: false,
				msg: "غير مسموح بفتح حسابك على اكثر من جهاز!",
				data: {
					error_in_device_id_only: user.device_id !== device_id,
				},
				is_authorized: true,
			});
		}

		// update notification_token
		user.notification_token = notification_token;
		await user.save();

		const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
			expiresIn: "8h",
		});

		// New response structure
		const expiresIn = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(); // 8 hours from now
		return sendResponse(
			res,
			"logged in successfully",
			{
				token,
				expires_in: expiresIn,
				data: {
					user_id: user.id,
					student_id: "", // TODO: Add student_id
					name: user.name,
					phone_number: user.phone,
				},
			},
			true,
		);
	} catch (error) {
		return sendResponse(res, "Error logging in", error, false);
	}
};

export const userProfile = async (req: Request, res: Response) => {
	const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
	if (!token) {
		return sendResponse(res, "No token provided", null, false);
	}

	try {
		const decoded: any = verify(token, JWT_SECRET); // Verify the token
		const userId = decoded.id;

		const user = await User.findOne({ where: { id: userId } });
		if (!user) {
			return sendResponse(res, "User not found", null, false);
		}

		const student = await Student.findOne({ where: { user_id: user.id } });
		if (!student) {
			return sendResponse(res, "Student not found", null, false);
		}

		return sendResponse(
			res,
			"بيانات الطالب",
			{
				user_id: user.id,
				student_id: student.id,
				name: user.name,
				phone_number: user.phone,
			},
			true,
		);
	} catch (error) {
		return sendResponse(res, "Error fetching user profile", error, false);
	}
};

// create admin login
export const adminLogin = async (req: Request, res: Response) => {
	const { phone, password } = req.body;

	try {
		const admin = await User.findOne({ where: { phone } });
		if (!admin) {
			return sendResponse(res, "رقم الهاتف او كلمة المرور غير صحيحة");
		}

		const isPasswordValid = await bcrypt.compare(password, admin.password);
		if (!isPasswordValid) {
			return sendResponse(res, "رقم الهاتف او كلمة المرور غير صحيحة");
		}

		const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, {
			expiresIn: "8h",
		});

		return sendResponse(res, "تم تسجيل الدخول بنجاح", { token });
	} catch (error) {
		return sendResponse(res, "Error logging in", error);
	}
};
