import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Question from "./Question";
import Answer from "./Answer";

interface UserAnswerAttributes {
	id: number;
	user_id: number; 
	question_id: number; 
	answer_id: number; 
}

interface UserAnswerCreationAttributes
	extends Omit<UserAnswerAttributes, "id"> {}

class UserAnswer
	extends Model<UserAnswerAttributes, UserAnswerCreationAttributes>
	implements UserAnswerAttributes
{
	public id!: number;
	public user_id!: number;
	public question_id!: number; 
	public answer_id!: number; 

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

UserAnswer.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		question_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Question,
				key: "id",
			},
		},
		answer_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Answer,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "user_answers",
	},
);
export default UserAnswer;
