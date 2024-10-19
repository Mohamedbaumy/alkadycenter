import axios from "axios";
import type { Doctor } from "./types";

const BASE_URL = "/api/doctor";

interface FetchDoctorsParams {
	search?: string;
	page?: number;
	limit?: number;
}

export const fetchDoctors = async ({
	search = "",
	page = 1,
	limit = 10,
}: FetchDoctorsParams) => {
	const response = await axios.get(BASE_URL, {
		params: { search, page, limit },
	});
	return response.data;
};

export const createDoctor = async (newDoctor: Omit<Doctor, "id">) => {
	const response = await axios.post(BASE_URL, newDoctor);
	return response.data;
};

export const updateDoctor = async (updatedDoctor: Doctor) => {
	const response = await axios.put(
		`${BASE_URL}/${updatedDoctor.id}`,
		updatedDoctor,
	);
	return response.data;
};

export const deleteDoctor = async (id: number) => {
	const response = await axios.delete(`${BASE_URL}/${id}`);
	return response.data;
};
