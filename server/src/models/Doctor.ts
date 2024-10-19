import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

interface DoctorAttributes {
	id: number;
	image: string;
	job_title: string;
	user_id: number;
}

interface DoctorCreationAttributes extends Omit<DoctorAttributes, "id"> {}

class Doctor
	extends Model<DoctorAttributes, DoctorCreationAttributes>
	implements DoctorAttributes
{
	public id!: number;
	public image!: string;
	public job_title!: string;
	public user_id!: number;

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
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		job_title: {
			type: DataTypes.STRING,
			allowNull: false,
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
		tableName: "doctors",
	},
);
export default Doctor;
