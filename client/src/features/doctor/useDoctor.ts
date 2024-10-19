import { useQuery, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import {
	fetchDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
} from "./api";

export const useDoctor = (search = "", page = 1, limit = 10) => {
	const {
		data: apiResponse,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["doctors", search, page, limit],
		queryFn: () => fetchDoctors({ search, page, limit }),
	});

	const createMutation = useMutation({
		mutationFn: createDoctor,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم إنشاء الطبيب بنجاح");
			} else {
				message.error(response.msg || "خطأ في إنشاء الطبيب");
			}
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateDoctor,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم تحديث الطبيب بنجاح");
			} else {
				message.error(response.msg || "خطأ في تحديث الطبيب");
			}
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteDoctor,
		onSuccess: (response) => {
			if (response.status) {
				refetch();
				message.success(response.msg || "تم حذف الطبيب بنجاح");
			} else {
				message.error(response.msg || "خطأ في حذف الطبيب");
			}
		},
	});

	return {
		doctors: apiResponse?.data?.doctors || [],
		totalPages: apiResponse?.data?.totalPages || 0,
		currentPage: apiResponse?.data?.currentPage || 1,
		isLoading,
		isAuthorized: apiResponse?.is_authorized,
		createDoctor: createMutation.mutate,
		updateDoctor: updateMutation.mutate,
		deleteDoctor: deleteMutation.mutate,
		refetch,
	};
};
