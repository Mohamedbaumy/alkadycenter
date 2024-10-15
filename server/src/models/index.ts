// Importing models
import User from "./User";
import Doctor from "./Doctor";
import Student from "./Student";
import Course from "./Course";
import College from "./College";
import AcademicYear from "./AcademicYear";
import Video from "./Video";
import File from "./File";
import Quiz from "./Quiz";
import Question from "./Question";
import Answer from "./Answer";
import UserAnswer from "./UserAnswer";
import StudentCourse from "./StudentCourse";

// Define relationships
// User <-> Doctor
User.hasOne(Doctor, { foreignKey: "userId" });
Doctor.belongsTo(User, { foreignKey: "userId" });

// User <-> Student
User.hasOne(Student, { foreignKey: "userId" });
Student.belongsTo(User, { foreignKey: "userId" });

// Student <-> Course (Many-to-Many)
Student.belongsToMany(Course, {
	through: StudentCourse,
	foreignKey: "studentId",
});
Course.belongsToMany(Student, {
	through: StudentCourse,
	foreignKey: "courseId",
});

// Doctor <-> Course (One-to-Many)
Doctor.hasMany(Course, { foreignKey: "doctorId" });
Course.belongsTo(Doctor, { foreignKey: "doctorId" });

// Course <-> College (One-to-Many)
Course.belongsTo(College, { foreignKey: "collegeId" });
College.hasMany(Course, { foreignKey: "collegeId" });

// Course <-> AcademicYear (One-to-Many)
Course.belongsTo(AcademicYear, { foreignKey: "academicYearId" });
AcademicYear.hasMany(Course, { foreignKey: "academicYearId" });

// Course <-> Video (One-to-Many)
Course.hasMany(Video, { foreignKey: "courseId" });
Video.belongsTo(Course, { foreignKey: "courseId" });

// Course <-> File (One-to-Many)
Course.hasMany(File, { foreignKey: "courseId" });
File.belongsTo(Course, { foreignKey: "courseId" });

// Course <-> Quiz (One-to-Many)
Course.hasMany(Quiz, { foreignKey: "courseId" });
Quiz.belongsTo(Course, { foreignKey: "courseId" });

// Quiz <-> Question (One-to-Many)
Quiz.hasMany(Question, { foreignKey: "quizId" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });

// Question <-> Answer (One-to-Many)
Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });

// User <-> UserAnswer (One-to-Many)
User.hasMany(UserAnswer, { foreignKey: "userId" });
UserAnswer.belongsTo(User, { foreignKey: "userId" });

// Question <-> UserAnswer (One-to-Many)
Question.hasMany(UserAnswer, { foreignKey: "questionId" });
UserAnswer.belongsTo(Question, { foreignKey: "questionId" });

// Answer <-> UserAnswer (One-to-Many)
Answer.hasMany(UserAnswer, { foreignKey: "answerId" });
UserAnswer.belongsTo(Answer, { foreignKey: "answerId" });

export {
	User,
	Doctor,
	Student,
	Course,
	College,
	AcademicYear,
	Video,
	File,
	Quiz,
	Question,
	Answer,
	UserAnswer,
	StudentCourse,
};
