import { useQuery } from "@tanstack/react-query";
import { fetchFaculties } from "../faculty/api";

export const useFacultyForStudents = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["faculties"],
		queryFn: () => fetchFaculties({ search: "", page: 1, limit: 10000 }),
	});

	return { data, isLoading, error };
};
