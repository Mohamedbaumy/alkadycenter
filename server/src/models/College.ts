import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface CollegeAttributes {
  id: number;
  name: string;
}

interface CollegeCreationAttributes extends Omit<CollegeAttributes, "id"> {}

class College extends Model<CollegeAttributes, CollegeCreationAttributes> implements CollegeAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

College.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "colleges",
  }
);

export default College;
