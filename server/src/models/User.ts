import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export enum UserRole {
	STUDENT = "student",
	DOCTOR = "doctor",
	ADMIN = "admin",
}

interface UserAttributes {
	id: number;
	name: string;
	phone: string;
	password: string;
	role: UserRole;
	platform?: string;
	manufacturer?: string;
	model?: string;
	device_id?: string;
	notification_token?: string;
}

interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number;
	public name!: string;
	public phone!: string;
	public password!: string;
	public role!: UserRole;
	public platform?: string;
	public manufacturer?: string;
	public model?: string;
	public device_id?: string;
	public notification_token?: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM(...Object.values(UserRole)),
			allowNull: false,
		},
		platform: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		manufacturer: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		model: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		device_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		notification_token: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "users",
	},
);
export default User;
