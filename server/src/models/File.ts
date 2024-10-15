import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Course from "./Course";

interface FileAttributes {
  id: number;
  title: string;
  url: string;
  courseId: number;
}

interface FileCreationAttributes extends Omit<FileAttributes, "id"> {}

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  public id!: number;
  public title!: string;
  public url!: string;
  public courseId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "files",
  }
);

export default File;
