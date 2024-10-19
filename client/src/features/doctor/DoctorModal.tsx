import React from "react";
import { Modal, Form, Input, Button, Typography, Space } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import type { Doctor } from "./types";

const { Text } = Typography;

interface DoctorModalProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (values: {
		name: string;
		phone: string;
		job_title: string;
		image: string;
	}) => void;
	editingDoctor: Doctor | null;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
	visible,
	onCancel,
	onSubmit,
	editingDoctor,
}) => {
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (visible && editingDoctor) {
			form.setFieldsValue(editingDoctor);
		} else {
			form.resetFields();
		}
	}, [visible, editingDoctor, form]);

	return (
		<Modal
			title={
				<Text strong>{editingDoctor ? "تعديل الطبيب" : "إضافة طبيب"}</Text>
			}
			visible={visible}
			onCancel={onCancel}
			footer={null}
			destroyOnClose
		>
			<Form form={form} onFinish={onSubmit} layout="vertical">
				<Form.Item
					name={["User", "name"]}
					label={<Text>اسم الطبيب</Text>}
					rules={[{ required: true, message: "الرجاء إدخال اسم الطبيب!" }]}
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
					<Input />
				</Form.Item>
				<Form.Item
					name="job_title"
					label={<Text>المسمى الوظيفي</Text>}
					rules={[{ required: true, message: "الرجاء إدخال المسمى الوظيفي!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="image"
					label={<Text>رابط الصورة</Text>}
					rules={[{ required: true, message: "الرجاء إدخال رابط الصورة!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
							{editingDoctor ? "تحديث" : "إنشاء"}
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
