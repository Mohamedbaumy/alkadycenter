import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Question from "./Question";

interface AnswerAttributes {
	id: number;
	text: string;
	isCorrect: boolean;
	question_id: number; 
}

interface AnswerCreationAttributes extends Omit<AnswerAttributes, "id"> {}

class Answer
	extends Model<AnswerAttributes, AnswerCreationAttributes>
	implements AnswerAttributes
{
	public id!: number;
	public text!: string;
	public isCorrect!: boolean;
	public question_id!: number; 

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Answer.init(
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
		isCorrect: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		question_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Question,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "answers",
	},
);
export default Answer;
