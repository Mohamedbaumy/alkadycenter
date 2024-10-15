import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface StudentCourseAttributes {
	id: number;
	studentId: number;
	courseId: number;
}

interface StudentCourseCreationAttributes
	extends Omit<StudentCourseAttributes, "id"> {}

class StudentCourse
	extends Model<StudentCourseAttributes, StudentCourseCreationAttributes>
	implements StudentCourseAttributes
{
	public id!: number;
	public studentId!: number;
	public courseId!: number;

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
		studentId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: "students", // Name of the table in the database
				key: "id",
			},
		},
		courseId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: "courses", // Name of the table in the database
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "StudentCourses",
	},
);

export default StudentCourse;
