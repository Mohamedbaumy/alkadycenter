import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Doctor from "./Doctor";
import Faculty from "./Faculty";
import Level from "./Level";

interface CourseAttributes {
	id: number;
	title: string;
	description: string;
	image: string;
	price: number;
	faculty_id: number;
	level_id: number;
	semester: string;
	doctor_id: number;
}

interface CourseCreationAttributes extends Omit<CourseAttributes, "id"> {}

class Course
	extends Model<CourseAttributes, CourseCreationAttributes>
	implements CourseAttributes
{
	public id!: number;
	public title!: string;
	public description!: string;
	public image!: string;
	public price!: number;
	public faculty_id!: number;
	public level_id!: number;
	public semester!: string;
	public doctor_id!: number;

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
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		faculty_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Faculty,
				key: "id",
			},
		},
		level_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Level,
				key: "id",
			},
		},
		semester: {
			type: DataTypes.ENUM("first", "second"),
			allowNull: false,
		},
		doctor_id: {
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
