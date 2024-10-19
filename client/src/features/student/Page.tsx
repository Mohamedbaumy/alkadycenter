import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import { Button, Typography, Space, Card, Input, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { StudentTable } from "./StudentTable";
import { StudentModal } from "./StudentModal";
import { useStudent } from "./useStudent";
import type { Student } from "./types";

const { Title, Text } = Typography;

export const StudentPage: FC = () => {
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    students,
    totalPages,
    currentPage,
    isLoading,
    isAuthorized,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudent(debouncedSearchTerm, page, limit);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
      setPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleStudentSubmit = (values: Student) => {
    if (editingStudent) {
      updateStudent({
        ...values,
        id: editingStudent.id,
        name: values.User.name,
        phone: values.User.phone,
        password: values.User.password,
      });
    } else {
      createStudent({
        ...values,
        name: values.User.name,
        phone: values.User.phone,
        password: values.User.password,
      });
    }
    setIsStudentModalVisible(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: number) => {
    deleteStudent(id);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  if (!isAuthorized) {
    return <Text>غير مصرح لك بعرض هذه الصفحة.</Text>;
  }

  return (
    <Card className="m-6">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="flex justify-between items-center">
          <Title level={2}>الطلاب</Title>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsStudentModalVisible(true)}
            >
              إضافة طالب
            </Button>
          </Space>
        </div>

        <Input
          placeholder="البحث عن طالب"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
        />

        <StudentTable
          students={students}
          isLoading={isLoading}
          onEdit={(student) => {
            setEditingStudent(student);
            setIsStudentModalVisible(true);
          }}
          onDelete={handleDeleteStudent}
        />

        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalPages * limit}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
        />

        <StudentModal
          visible={isStudentModalVisible}
          onCancel={() => {
            setIsStudentModalVisible(false);
            setEditingStudent(null);
          }}
          onSubmit={handleStudentSubmit}
          editingStudent={editingStudent}
        />
      </Space>
    </Card>
  );
};

export default StudentPage;

// Add this utility function at the end of the file or in a separate utils file
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<F>) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  } as F;
}
