import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface AcademicYearAttributes {
  id: number;
  year: string;
}

interface AcademicYearCreationAttributes extends Omit<AcademicYearAttributes, "id"> {}

class AcademicYear extends Model<AcademicYearAttributes, AcademicYearCreationAttributes> implements AcademicYearAttributes {
  public id!: number;
  public year!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AcademicYear.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "academic_years",
  }
);

export default AcademicYear;
