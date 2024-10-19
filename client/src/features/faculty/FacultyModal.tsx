import React from "react";
import { Modal, Form, Input, Button, Typography, Space } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import type { Faculty } from "./types";

const { Text } = Typography;

interface FacultyModalProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (values: { name: string }) => void;
	editingFaculty: Faculty | null;
}

export const FacultyModal: React.FC<FacultyModalProps> = ({
	visible,
	onCancel,
	onSubmit,
	editingFaculty,
}) => {
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (visible && editingFaculty) {
			form.setFieldsValue(editingFaculty);
		} else {
			form.resetFields();
		}
	}, [visible, editingFaculty, form]);

	return (
		<Modal
			title={
				<Text strong>{editingFaculty ? "تعديل الكلية" : "إضافة كلية"}</Text>
			}
			visible={visible}
			onCancel={onCancel}
			footer={null}
			destroyOnClose
		>
			<Form form={form} onFinish={onSubmit} layout="vertical">
				<Form.Item
					name="name"
					label={<Text>اسم الكلية</Text>}
					rules={[{ required: true, message: "الرجاء إدخال اسم الكلية!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
							{editingFaculty ? "تحديث" : "إنشاء"}
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
