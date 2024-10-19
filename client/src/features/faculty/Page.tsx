import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import { Button, Typography, Space, Card, Input, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FacultyTable } from "./FacultyTable";
import { FacultyModal } from "./FacultyModal";
import { LevelModal } from "./LevelModal";
import { useFaculty } from "./useFaculty";
import type { Faculty, Level } from "./types";

const { Title, Text } = Typography;

export const FacultyPage: FC = () => {
	const [isFacultyModalVisible, setIsFacultyModalVisible] = useState(false);
	const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);
	const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
	const [editingLevel, setEditingLevel] = useState<Level | null>(null);
	const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(
		null,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const {
		faculties,
		totalPages,
		currentPage,
		isLoading,
		isAuthorized,
		createFaculty,
		updateFaculty,
		deleteFaculty,
		createLevel,
		updateLevel,
		deleteLevel,
	} = useFaculty(debouncedSearchTerm, page, limit);

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

	const handleFacultySubmit = (values: { name: string }) => {
		if (editingFaculty) {
			updateFaculty({ ...editingFaculty, ...values });
			setIsFacultyModalVisible(false);
			setEditingFaculty(null);
		} else {
			createFaculty({ ...values, Levels: [] }); // Add Levels property
		}
	};

	const handleLevelSubmit = (values: { name: string; faculty_id: number }) => {
		if (editingLevel) {
			updateLevel({ ...editingLevel, ...values });
		} else {
			createLevel(values);
		}
		setIsLevelModalVisible(false);
		setEditingLevel(null);
		setSelectedFacultyId(null);
	};

	const handleDeleteFaculty = (id: number) => {
		deleteFaculty(id);
	};

	const handleDeleteLevel = ({
		facultyId,
		levelId,
	}: { facultyId: number; levelId: number }) => {
		deleteLevel({ facultyId, levelId });
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
					<Title level={2}>الكليات</Title>
					<Space>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setIsFacultyModalVisible(true)}
						>
							إضافة كلية
						</Button>
					</Space>
				</div>

				<Input
					placeholder="البحث عن كلية"
					prefix={<SearchOutlined />}
					onChange={(e) => handleSearch(e.target.value)}
					value={searchTerm}
				/>

				<FacultyTable
					faculties={faculties}
					isLoading={isLoading}
					onEdit={(faculty) => {
						setEditingFaculty(faculty);
						setIsFacultyModalVisible(true);
					}}
					onDelete={handleDeleteFaculty}
					onAddLevel={(facultyId) => {
						setSelectedFacultyId(facultyId);
						setIsLevelModalVisible(true);
					}}
					onEditLevel={(level) => {
						setEditingLevel(level);
						setIsLevelModalVisible(true);
					}}
					onDeleteLevel={(facultyId, levelId) => handleDeleteLevel({ facultyId, levelId })}
				/>

				<Pagination
					current={currentPage}
					pageSize={limit}
					total={totalPages * limit} // Estimate total items
					onChange={handlePageChange}
					showSizeChanger
					showQuickJumper
				/>

				<FacultyModal
					visible={isFacultyModalVisible}
					onCancel={() => {
						setIsFacultyModalVisible(false);
						setEditingFaculty(null);
					}}
					onSubmit={handleFacultySubmit}
					editingFaculty={editingFaculty}
				/>

				<LevelModal
					visible={isLevelModalVisible}
					onCancel={() => {
						setIsLevelModalVisible(false);
						setEditingLevel(null);
						setSelectedFacultyId(null);
					}}
					onSubmit={handleLevelSubmit}
					editingLevel={editingLevel}
					facultyId={selectedFacultyId}
				/>
			</Space>
		</Card>
	);
};

export default FacultyPage;

// Add this utility function at the end of the file or in a separate utils file
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return function (...args: Parameters<F>) {
		const context = this;
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	} as F;
}
