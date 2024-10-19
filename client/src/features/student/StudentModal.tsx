import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography, Space, Select } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import type { Student } from "./types";
import { useFacultyForStudents } from "./useFacultyForStudents";
import type { Faculty, Level } from "../faculty/types";

const { Text } = Typography;
const { Option } = Select;

interface StudentModalProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (values: {
		name: string;
		phone: string;
		password: string;
		faculty_id: number;
		level_id: number;
	}) => void;
	editingStudent: Student | null;
}

export const StudentModal: React.FC<StudentModalProps> = ({
	visible,
	onCancel,
	onSubmit,
	editingStudent,
}) => {
	const [form] = Form.useForm();
	const { data: faculties } = useFacultyForStudents();
	const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

	React.useEffect(() => {
		if (visible && editingStudent) {
			form.setFieldsValue({
				...editingStudent,
				name: editingStudent.User.name,
				phone: editingStudent.User.phone,
				password: editingStudent.User.password,
			});
		} else {
			form.resetFields();
		}
	}, [visible, editingStudent, form]);

	return (
		<Modal
			title={
				<Text strong>{editingStudent ? "تعديل الطالب" : "إضافة طالب"}</Text>
			}
			visible={visible}
			onCancel={onCancel}
			footer={null}
			destroyOnClose
		>
			<Form form={form} onFinish={onSubmit} layout="vertical">
				{JSON.stringify(selectedFaculty)}
				<Form.Item
					name={["User", "name"]}
					label={<Text>اسم الطالب</Text>}
					rules={[{ required: true, message: "الرجاء إدخال اسم الطالب!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name={["User", "phone"]}
					label={<Text>رقم الهاتف</Text>}
					rules={[{ required: true, message: "الرجاء إدخال رقم الهاتف!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name={["User", "password"]}
					label={<Text>كلمة المرور</Text>}
					rules={[{ required: true, message: "الرجاء إدخال كلمة المرور!" }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="faculty_id"
					label={<Text>الكلية</Text>}
					rules={[{ required: true, message: "الرجاء اختيار الكلية!" }]}
				>
					<Select
						placeholder="اختر الكلية"
						onChange={(value) =>
							setSelectedFaculty(
								faculties?.data?.faculties.find(
									(faculty: Faculty) => faculty.id === value,
								) || null,
							)
						}
					>
						{faculties?.data?.faculties.map((faculty: Faculty) => (
							<Option key={faculty.id} value={faculty.id}>
								{faculty.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					name="level_id"
					label={<Text>المستوى</Text>}
					rules={[{ required: true, message: "الرجاء اختيار المستوى!" }]}
				>
					<Select placeholder="اختر المستوى">
						{selectedFaculty?.Levels.map((level: Level) => (
							<Option key={level.id} value={level.id}>
								{level.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
							{editingStudent ? "تحديث" : "إنشاء"}
						</Button>
						<Button onClick={onCancel} icon={<CloseOutlined />}>
							إلغاء
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};
