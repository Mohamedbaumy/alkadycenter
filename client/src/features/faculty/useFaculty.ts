import { useQuery, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import {
	fetchFaculties,
	createFaculty,
	updateFaculty,
	deleteFaculty,
	createLevel,
	updateLevel,
	deleteLevel,
} from "./api";

export const useFaculty = (search = "", page = 1, limit = 10) => {
	const {
		data: apiResponse,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["faculties", search, page, limit],
		queryFn: () => fetchFaculties({ search, page, limit }),
	});

	const createMutation = useMutation({
		mutationFn: createFaculty,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم إنشاء الكلية بنجاح");
			} else {
				message.error(response.msg || "خطأ في إنشاء الكلية");
			}
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateFaculty,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم تحديث الكلية بنجاح");
			} else {
				message.error(response.msg || "خطأ في تحديث الكلية");
			}
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteFaculty,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم حذف الكلية بنجاح");
			} else {
				message.error(response.msg || "خطأ في حذف الكلية");
			}
		},
	});

	const createLevelMutation = useMutation({
		mutationFn: createLevel,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم إنشاء المستوى بنجاح");
			} else {
				message.error(response.msg || "خطأ في إنشاء المستوى");
			}
		},
	});

	const updateLevelMutation = useMutation({
		mutationFn: updateLevel,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم تحديث المستوى بنجاح");
			} else {
				message.error(response.msg || "خطأ في تحديث المستوى");
			}
		},
	});

	const deleteLevelMutation = useMutation({
		mutationFn: ({
			facultyId,
			levelId,
		}: { facultyId: number; levelId: number }) =>
			deleteLevel(facultyId, levelId),
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم حذف المستوى بنجاح");
			} else {
				message.error(response.msg || "خطأ في حذف المستوى");
			}
		},
	});

	return {
		faculties: apiResponse?.data?.faculties || [],
		totalPages: apiResponse?.data?.totalPages || 0,
		currentPage: apiResponse?.data?.currentPage || 1,
		isLoading,
		isAuthorized: apiResponse?.is_authorized,
		createFaculty: createMutation.mutate,
		updateFaculty: updateMutation.mutate,
		deleteFaculty: deleteMutation.mutate,
		createLevel: createLevelMutation.mutate,
		updateLevel: updateLevelMutation.mutate,
		deleteLevel: deleteLevelMutation.mutate,
		refetch,
	};
};
