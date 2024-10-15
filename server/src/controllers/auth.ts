import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response) => {
	const { name, phone, password, role, device_id } = req.body;

	try {
		const existingUser = await User.findOne({ where: { phone } });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			phone,
			password: hashedPassword,
			role,
			device_id,
		});

		return res.status(201).json({ msg: "User registered successfully", user });
	} catch (error) {
		return res.status(500).json({ message: "Error registering user", error });
	}
};

export const login = async (req: Request, res: Response) => {
	const { phone, password, device_id } = req.body;

	try {
		const user = await User.findOne({ where: { phone } });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		if (!user.device_id) {
			user.device_id = device_id;
			await user.save();
		} else if (user.device_id !== device_id) {
			return res.status(403).json({ message: "Device not recognized" });
		}

		const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
			expiresIn: "8h",
		});

		return res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		return res.status(500).json({ message: "Error logging in", error });
	}
};
