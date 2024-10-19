import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Level from "./Level";
import Faculty from "./Faculty";

interface StudentAttributes {
	id: number;
	faculty_id: number;
	level_id: number;
	user_id: number;
}

interface StudentCreationAttributes extends Omit<StudentAttributes, "id"> {}

class Student
	extends Model<StudentAttributes, StudentCreationAttributes>
	implements StudentAttributes
{
	public id!: number;
	public faculty_id!: number;
	public level_id!: number;
	public user_id!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Student.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
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
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "students",
	},
);

Student.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Student, { foreignKey: "user_id" });

export default Student;
