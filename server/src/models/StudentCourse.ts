import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Student from "./Student";
import Course from "./Course";
interface StudentCourseAttributes {
	id: number;
	student_id: number;
	course_id: number;
}

interface StudentCourseCreationAttributes
	extends Omit<StudentCourseAttributes, "id"> {}

class StudentCourse
	extends Model<StudentCourseAttributes, StudentCourseCreationAttributes>
	implements StudentCourseAttributes
{
	public id!: number;
	public student_id!: number;
	public course_id!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

StudentCourse.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		student_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Student,
				key: "id",
			},
		},
		course_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Course,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "StudentCourses",
		indexes: [
			{
				unique: true,
				fields: ["student_id", "course_id"], // Composite unique constraint
			},
		],
	},
);
export default StudentCourse;
