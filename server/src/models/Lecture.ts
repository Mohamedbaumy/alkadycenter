import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Course from "./Course";

interface LectureAttributes {
	id: number;
	title: string;
	link: string;
	course_id: number; 
	is_free: boolean;
	duration: string;
}

interface LectureCreationAttributes extends Omit<LectureAttributes, "id"> {}

class Lecture
	extends Model<LectureAttributes, LectureCreationAttributes>
	implements LectureAttributes
{
	public id!: number;
	public title!: string;
	public link!: string;
	public course_id!: number; 
	public is_free!: boolean;
	public duration!: string;


	public readonly createdAt!: Date;
	public readonly updatedAt!: Date; 
}

Lecture.init(
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
		link: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		is_free: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		duration: {
			type: DataTypes.STRING,
			allowNull: false,
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
		tableName: "lectures",
	},
);
export default Lecture;
