import { useQuery, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api";

export const useStudent = (search = "", page = 1, limit = 10) => {
  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", search, page, limit],
    queryFn: () => fetchStudents({ search, page, limit }),
  });

  const createMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: (response) => {
      if (response.status) {
        refetch();
        message.success(response.msg || "تم إنشاء الطالب بنجاح");
      } else {
        message.error(response.msg || "خطأ في إنشاء الطالب");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: (response) => {
      if (response.status) {
        refetch();
        message.success(response.msg || "تم تحديث الطالب بنجاح");
      } else {
        message.error(response.msg || "خطأ في تحديث الطالب");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (response) => {
      if (response.status) {
        refetch();
        message.success(response.msg || "تم حذف الطالب بنجاح");
      } else {
        message.error(response.msg || "خطأ في حذف الطالب");
      }
    },
  });

  return {
    students: apiResponse?.data?.students || [],
    totalPages: apiResponse?.data?.totalPages || 0,
    currentPage: apiResponse?.data?.currentPage || 1,
    isLoading,
    isAuthorized: apiResponse?.is_authorized,
    createStudent: createMutation.mutate,
    updateStudent: updateMutation.mutate,
    deleteStudent: deleteMutation.mutate,
    refetch,
  };
};
