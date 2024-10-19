import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Faculty from "./Faculty";

interface LevelAttributes {
	id: number;
	name: string;
	faculty_id: number;
}

interface LevelCreationAttributes extends Omit<LevelAttributes, "id"> {}

class Level
	extends Model<LevelAttributes, LevelCreationAttributes>
	implements LevelAttributes
{
	public id!: number;
	public name!: string;
	public faculty_id!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Level.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
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
	},
	{
		sequelize,
		tableName: "levels",
	},
);
export default Level;
