import type { FC } from "react";
import { Table, Button, Typography, Space, Tooltip } from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import type { Doctor } from "./types";

const { Text } = Typography;

interface DoctorTableProps {
	doctors: Doctor[];
	isLoading: boolean;
	onEdit: (doctor: Doctor) => void;
	onDelete: (id: number) => void;
}

export const DoctorTable: FC<DoctorTableProps> = ({
	doctors,
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
				<Tooltip title="رقم تعريف الطبيب">
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
			render: (_: string, record: Doctor) => <Text>{record.User.name}</Text>,
		},
		{
			title: <Text strong>الهاتف</Text>,
			dataIndex: "phone",
			key: "phone",
			render: (_: string, record: Doctor) => <Text>{record.User.phone}</Text>,
		},
		{
			title: <Text strong>كلمة المرور</Text>,
			dataIndex: "password",
			key: "password",
			render: (_: string, record: Doctor) => (
				<Text>{record.User.password}</Text>
			),
		},
		{
			title: <Text strong>المسمى الوظيفي</Text>,
			dataIndex: "job_title",
			key: "job_title",
			render: (jobTitle: string) => <Text>{jobTitle}</Text>,
		},
		{
			title: <Text strong>الإجراءات</Text>,
			key: "actions",
			render: (_: string, record: Doctor) => (
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
			dataSource={doctors}
			rowKey="id"
			loading={isLoading}
			pagination={false}
		/>
	);
};
