import type { FC } from "react";
import { Table, Button, Typography, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Student } from "./types";

const { Text } = Typography;

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export const StudentTable: FC<StudentTableProps> = ({
  students,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: <Text strong>الرقم التعريفي</Text>,
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Tooltip title="رقم تعريف الطالب">
          <Space>
            <InfoCircleOutlined />
            <Text>{id}</Text>
          </Space>
        </Tooltip>
      ),
    },
    {
      title: <Text strong>الاسم</Text>,
      dataIndex: "name",
      key: "name",
      render: (_: string, record: Student) => <Text>{record.User.name}</Text>,
    },
    {
      title: <Text strong>الهاتف</Text>,
      dataIndex: "phone",
      key: "phone",
      render: (_: string, record: Student) => <Text>{record.User.phone}</Text>,
    },
    {
      title: <Text strong>الكلية</Text>,
      dataIndex: "faculty_id",
      key: "faculty_id",
      render: (faculty_id: number) => <Text>{faculty_id}</Text>,
    },
    {
      title: <Text strong>المستوى</Text>,
      dataIndex: "level_id",
      key: "level_id",
      render: (level_id: number) => <Text>{level_id}</Text>,
    },
    {
      title: <Text strong>الإجراءات</Text>,
      key: "actions",
      render: (_: string, record: Student) => (
        <Space size="middle">
          <Tooltip title="تعديل">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              type="primary"
              ghost
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={students}
      rowKey="id"
      loading={isLoading}
    />
  );
};
