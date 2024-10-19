import React from "react";
import { Modal, Typography, Descriptions, Button, message } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Student } from "./types";
import { resetStudentDeviceInfo } from "./api";

const { Text } = Typography;

interface DeviceInfoModalProps {
	visible: boolean;
	onCancel: () => void;
	student: Student | null;
	onDeviceInfoReset: () => void;
}

export const DeviceInfoModal: React.FC<DeviceInfoModalProps> = ({
	visible,
	onCancel,
	student,
	onDeviceInfoReset,
}) => {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		message.success("تم النسخ إلى الحافظة");
	};

	const handleResetDeviceInfo = async () => {
		if (student) {
			try {
				await resetStudentDeviceInfo(student.id);
				message.success("تم إعادة تعيين معلومات الجهاز");
				onDeviceInfoReset();
			} catch (error) {
				message.error("حدث خطأ أثناء إعادة تعيين معلومات الجهاز");
			}
		}
	};

	return (
		<Modal
			title={<Text strong>معلومات الجهاز</Text>}
			visible={visible}
			onCancel={onCancel}
			footer={[
				<Button
					key="reset"
					type="primary"
					danger
					icon={<DeleteOutlined />}
					onClick={handleResetDeviceInfo}
				>
					إعادة تعيين معلومات الجهاز
				</Button>,
			]}
		>
			{student && (
				<Descriptions column={1}>
					{[
						"platform",
						"manufacturer",
						"model",
						"device_id",
						"notification_token",
					].map((field) => (
						<Descriptions.Item
							key={field}
							label={<Text strong>{getFieldLabel(field)}</Text>}
						>
							<Text
								copyable={{
									text: student.User[field] || "",
									icon: <CopyOutlined />,
								}}
							>
								{student.User[field] || "غير متوفر"}
							</Text>
						</Descriptions.Item>
					))}
				</Descriptions>
			)}
		</Modal>
	);
};

const getFieldLabel = (field: string): string => {
	const labels: { [key: string]: string } = {
		platform: "المنصة",
		manufacturer: "الشركة المصنعة",
		model: "الموديل",
		device_id: "معرف الجهاز",
		notification_token: "رمز الإشعارات",
	};
	return labels[field] || field;
};
