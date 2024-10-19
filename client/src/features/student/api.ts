import axios from "axios";
import type { Student } from "./types";

const BASE_URL = "/api/student";

interface FetchStudentsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const fetchStudents = async ({
  search = "",
  page = 1,
  limit = 10,
}: FetchStudentsParams) => {
  const response = await axios.get(BASE_URL, {
    params: { search, page, limit },
  });
  return response.data;
};

export const createStudent = async (newStudent: Omit<Student, "id">) => {
  const response = await axios.post(BASE_URL, newStudent);
  return response.data;
};

export const updateStudent = async (updatedStudent: Student) => {
  const response = await axios.put(
    `${BASE_URL}/${updatedStudent.id}`,
    updatedStudent
  );
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
