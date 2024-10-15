import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Question from "./Question";
import Answer from "./Answer";

interface UserAnswerAttributes {
	id: number;
	userId: number;
	questionId: number;
	answerId: number; // Foreign key to Answer
}

interface UserAnswerCreationAttributes
	extends Omit<UserAnswerAttributes, "id"> {}

class UserAnswer
	extends Model<UserAnswerAttributes, UserAnswerCreationAttributes>
	implements UserAnswerAttributes
{
	public id!: number;
	public userId!: number;
	public questionId!: number;
	public answerId!: number;

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
		userId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		questionId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Question,
				key: "id",
			},
		},
		answerId: {
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
