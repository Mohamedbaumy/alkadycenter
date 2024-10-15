import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import AcademicYear from "./AcademicYear";
import College from "./College";

interface StudentAttributes {
	id: number;
	major: string;
	collegeId: number;
	academicYearId: number;
	userId: number;
}

interface StudentCreationAttributes extends Omit<StudentAttributes, "id"> {}

class Student
	extends Model<StudentAttributes, StudentCreationAttributes>
	implements StudentAttributes
{
	public id!: number;
	public major!: string;
	public collegeId!: number;
	public academicYearId!: number;
	public userId!: number;

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
		major: {
			type: DataTypes.STRING,
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
		tableName: "students",
	},
);

Student.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Student, { foreignKey: "userId" });

export default Student;
