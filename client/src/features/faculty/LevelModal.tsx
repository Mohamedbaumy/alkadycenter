import React from "react";
import { Modal, Form, Input, Button, Typography, Space } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import type { Level } from "./types";

const { Text } = Typography;

interface LevelModalProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (values: { name: string; faculty_id: number }) => void;
	editingLevel: Level | null;
	facultyId: number | null;
}

export const LevelModal: React.FC<LevelModalProps> = ({
	visible,
	onCancel,
	onSubmit,
	editingLevel,
	facultyId,
}) => {
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (visible && editingLevel) {
			form.setFieldsValue(editingLevel);
		} else {
			form.resetFields();
		}
	}, [visible, editingLevel, form]);

	const handleSubmit = (values: { name: string }) => {
		onSubmit({
			...values,
			faculty_id: editingLevel ? editingLevel.faculty_id : (facultyId ?? 0), // Use a default value (e.g., 0) if facultyId is null
		});
	};

	return (
		<Modal
			title={<Text strong>{editingLevel ? "تعديل الفرقة" : "إضافة فرقة"}</Text>}
			visible={visible}
			onCancel={onCancel}
			footer={null}
			destroyOnClose
		>
			<Form form={form} onFinish={handleSubmit} layout="vertical">
				<Form.Item
					name="name"
					label={<Text>اسم الفرقة</Text>}
					rules={[{ required: true, message: "الرجاء إدخال اسم الفرقة!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
							{editingLevel ? "تحديث" : "إنشاء"}
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
