import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import { Button, Typography, Space, Card, Input, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { DoctorTable } from "./DoctorTable";
import { DoctorModal } from "./DoctorModal";
import { useDoctor } from "./useDoctor";
import type { Doctor } from "./types";

const { Title, Text } = Typography;

export const DoctorPage: FC = () => {
	const [isDoctorModalVisible, setIsDoctorModalVisible] = useState(false);
	const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const {
		doctors,
		totalPages,
		currentPage,
		isLoading,
		isAuthorized,
		createDoctor,
		updateDoctor,
		deleteDoctor,
	} = useDoctor(debouncedSearchTerm, page, limit);

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			setDebouncedSearchTerm(value);
			setPage(1);
		}, 300),
		[],
	);

	useEffect(() => {
		debouncedSearch(searchTerm);
	}, [searchTerm, debouncedSearch]);

	const handleDoctorSubmit = (values: Doctor) => {
		if (editingDoctor) {
			updateDoctor({
				...values,
				id: editingDoctor.id,
				name: values.User.name,
				phone: values.User.phone,
				password: values.User.password,
			});
		} else {
			createDoctor({
				...values,
				name: values.User.name,
				phone: values.User.phone,
				password: values.User.password,
			});
		}
		setIsDoctorModalVisible(false);
		setEditingDoctor(null);
	};

	const handleDeleteDoctor = (id: number) => {
		deleteDoctor(id);
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
					<Title level={2}>الأطباء</Title>
					<Space>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setIsDoctorModalVisible(true)}
						>
							إضافة طبيب
						</Button>
					</Space>
				</div>

				<Input
					placeholder="البحث عن طبيب"
					prefix={<SearchOutlined />}
					onChange={(e) => handleSearch(e.target.value)}
					value={searchTerm}
				/>

				<DoctorTable
					doctors={doctors}
					isLoading={isLoading}
					onEdit={(doctor) => {
						setEditingDoctor(doctor);
						setIsDoctorModalVisible(true);
					}}
					onDelete={handleDeleteDoctor}
				/>

				<Pagination
					current={currentPage}
					pageSize={limit}
					total={totalPages * limit}
					onChange={handlePageChange}
					showSizeChanger
					showQuickJumper
				/>

				<DoctorModal
					visible={isDoctorModalVisible}
					onCancel={() => {
						setIsDoctorModalVisible(false);
						setEditingDoctor(null);
					}}
					onSubmit={handleDoctorSubmit}
					editingDoctor={editingDoctor}
				/>
			</Space>
		</Card>
	);
};

export default DoctorPage;

// Add this utility function at the end of the file or in a separate utils file
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return function (...args: Parameters<F>) {
		const context = this;
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	} as F;
}
