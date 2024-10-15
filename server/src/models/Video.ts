import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Course from "./Course";

interface VideoAttributes {
  id: number;
  title: string;
  url: string;
  courseId: number;
}

interface VideoCreationAttributes extends Omit<VideoAttributes, "id"> {}

class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
  public id!: number;
  public title!: string;
  public url!: string;
  public courseId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Video.init(
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
    tableName: "videos",
  }
);

export default Video;
