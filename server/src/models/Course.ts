import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Doctor from "./Doctor";
import College from "./College";
import AcademicYear from "./AcademicYear";

interface CourseAttributes {
	id: number;
	title: string;
	description: string;
	price: number;
	collegeId: number;
	academicYearId: number;
	semester: string; // "first" or "second"
	doctorId: number; // Doctor
}

interface CourseCreationAttributes extends Omit<CourseAttributes, "id"> {}

class Course
	extends Model<CourseAttributes, CourseCreationAttributes>
	implements CourseAttributes
{
	public id!: number;
	public title!: string;
	public description!: string;
	public price!: number;
	public collegeId!: number;
	public academicYearId!: number;
	public semester!: string;
	public doctorId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Course.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		collegeId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: College,
				key: "id",
			},
		},
		academicYearId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: AcademicYear,
				key: "id",
			},
		},
		semester: {
			type: DataTypes.ENUM("first", "second"),
			allowNull: false,
		},
		doctorId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Doctor,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "courses",
	},
);

export default Course;
