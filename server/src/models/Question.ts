import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Answer from "./Answer";
import Quiz from "./Quiz";

interface QuestionAttributes {
	id: number;
	text: string;
	quiz_id: number; 
}

interface QuestionCreationAttributes extends Omit<QuestionAttributes, "id"> {}

class Question
	extends Model<QuestionAttributes, QuestionCreationAttributes>
	implements QuestionAttributes
{
	public id!: number;
	public text!: string;
	public quiz_id!: number; 

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
		quiz_id: {
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
Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

export default Question;
