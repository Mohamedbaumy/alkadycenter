import axios from "axios";
import type { Faculty, Level } from "./types";

const BASE_URL = "/api/faculty";

interface FetchFacultiesParams {
	search?: string;
	page?: number;
	limit?: number;
}

export const fetchFaculties = async ({
	search = "",
	page = 1,
	limit = 10,
}: FetchFacultiesParams) => {
	const response = await axios.get(BASE_URL, {
		params: { search, page, limit },
	});
	return response.data;
};

export const createFaculty = async (newFaculty: Omit<Faculty, "id">) => {
	const response = await axios.post(BASE_URL, newFaculty);
	return response.data;
};

export const updateFaculty = async (updatedFaculty: Faculty) => {
	const response = await axios.put(
		`${BASE_URL}/${updatedFaculty.id}`,
		updatedFaculty,
	);
	return response.data;
};

export const deleteFaculty = async (id: number) => {
	const response = await axios.delete(`${BASE_URL}/${id}`);
	return response.data;
};

export const createLevel = async (newLevel: Omit<Level, "id">) => {
	const response = await axios.post(`${BASE_URL}/${newLevel.faculty_id}/level`, newLevel);
	return response.data;
};

export const updateLevel = async (updatedLevel: Level) => {
	const response = await axios.put(
		`${BASE_URL}/${updatedLevel.faculty_id}/level/${updatedLevel.id}`,
		updatedLevel,
	);
	return response.data;
};

export const deleteLevel = async (facultyId: number, levelId: number) => {
	const response = await axios.delete(`${BASE_URL}/${facultyId}/level/${levelId}`);
	return response.data;
};
