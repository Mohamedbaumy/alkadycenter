import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Question from "./Question";

interface QuizAttributes {
	id: number;
	title: string;
	course_id: number;
}

interface QuizCreationAttributes extends Omit<QuizAttributes, "id"> {}

class Quiz
	extends Model<QuizAttributes, QuizCreationAttributes>
	implements QuizAttributes
{
	public id!: number;
	public title!: string;
	public course_id!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Quiz.init(
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
		course_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "quizzes",
	},
);

export default Quiz;
