import type { FC } from "react";
import { Table, Button, Typography, Space, Tooltip, Tag } from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	InfoCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import type { Faculty, Level } from "./types";

const { Text } = Typography;

interface FacultyTableProps {
	faculties: Faculty[];
	isLoading: boolean;
	onEdit: (faculty: Faculty) => void;
	onDelete: (id: number) => void;
	onAddLevel: (facultyId: number) => void;
	onEditLevel: (level: Level) => void;
	onDeleteLevel: (facultyId: number, levelId: number) => void;
}

export const FacultyTable: FC<FacultyTableProps> = ({
	faculties,
	isLoading,
	onEdit,
	onDelete,
	onAddLevel,
	onEditLevel,
	onDeleteLevel,
}) => {
	const columns = [
		{
			title: <Text strong>الرقم التعريفي</Text>,
			dataIndex: "id",
			key: "id",
			render: (id: number) => (
				<Tooltip title="رقم تعريف الكلية">
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
			render: (name: string) => <Text>{name}</Text>,
		},
		{
			title: <Text strong>الفرق</Text>,
			dataIndex: "Levels",
			key: "levels",
			render: (_: string, record: Faculty) => (
				<Space wrap>
					{record.Levels.map((level) => (
						<Tag
							key={level.id}
							closable
							onClose={() => onDeleteLevel(record.id, level.id)}
							onClick={() => onEditLevel(level)}
						>
							{level.name}
						</Tag>
					))}
					<Button
						type="dashed"
						icon={<PlusOutlined />}
						size="small"
						onClick={() => onAddLevel(record.id)}
					>
						إضافة فرقة
					</Button>
				</Space>
			),
		},
		{
			title: <Text strong>الإجراءات</Text>,
			key: "actions",
			render: (_: string, record: Faculty) => (
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
			dataSource={faculties}
			rowKey="id"
			loading={isLoading}
			pagination={{ pageSize: 10 }}
		/>
	);
};
