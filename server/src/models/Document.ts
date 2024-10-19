import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Course from "./Course";

interface DocumentAttributes {
	id: number;
	title: string;
	link: string;
	is_free: boolean;
	course_id: number; 
}

interface DocumentCreationAttributes extends Omit<DocumentAttributes, "id"> {}

class Document
	extends Model<DocumentAttributes, DocumentCreationAttributes>
	implements DocumentAttributes
{
	public id!: number;
	public title!: string;
	public link!: string;
	public is_free!: boolean;
	public course_id!: number; 

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Document.init(
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
		tableName: "documents",
	},
);

export default Document;
