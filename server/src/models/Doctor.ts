import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

interface DoctorAttributes {
	id: number;
	specialization: string;
	userId: number; // Foreign key to User
}

interface DoctorCreationAttributes extends Omit<DoctorAttributes, "id"> {}

class Doctor
	extends Model<DoctorAttributes, DoctorCreationAttributes>
	implements DoctorAttributes
{
	public id!: number;
	public specialization!: string;
	public userId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Doctor.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		specialization: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
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
		tableName: "doctors",
	},
);

export default Doctor;
