import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface FacultyAttributes {
	id: number;
	name: string;
}

interface FacultyCreationAttributes extends Omit<FacultyAttributes, "id"> {}

class Faculty
	extends Model<FacultyAttributes, FacultyCreationAttributes>
	implements FacultyAttributes
{
	public id!: number;
	public name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Faculty.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		tableName: "Facultys",
	},
);

export default Faculty;
