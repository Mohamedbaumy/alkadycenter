import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Question from "./Question";

interface QuizAttributes {
  id: number;
  title: string;
}

interface QuizCreationAttributes extends Omit<QuizAttributes, "id"> {}

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
  public id!: number;
  public title!: string;

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
  },
  {
    sequelize,
    tableName: "quizzes",
  }
);

// Define relationship
Quiz.hasMany(Question, { foreignKey: "quizId" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });

export default Quiz;
