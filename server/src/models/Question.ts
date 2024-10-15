import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Answer from "./Answer";
import Quiz from "./Quiz";

interface QuestionAttributes {
	id: number;
	text: string;
	quizId: number;
}

interface QuestionCreationAttributes extends Omit<QuestionAttributes, "id"> {}

class Question
	extends Model<QuestionAttributes, QuestionCreationAttributes>
	implements QuestionAttributes
{
	public id!: number;
	public text!: string;
	public quizId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Question.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quizId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Quiz,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "questions",
	},
);

// Define relationship
Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });

export default Question;
