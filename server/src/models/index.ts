// Importing models
import User from "./User";
import Doctor from "./Doctor";
import Student from "./Student";
import Course from "./Course";
import Faculty from "./Faculty";
import Level from "./Level";
import Lecture from "./Lecture";
import Document from "./Document";
import Quiz from "./Quiz";
import Question from "./Question";
import Answer from "./Answer";
import UserAnswer from "./UserAnswer";
import StudentCourse from "./StudentCourse";

// Define relationships
// User <-> Doctor
User.hasOne(Doctor, { foreignKey: "user_id" });
Doctor.belongsTo(User, { foreignKey: "user_id" });

// User <-> Student
User.hasOne(Student, { foreignKey: "user_id" });
Student.belongsTo(User, { foreignKey: "user_id" });

// Student <-> Course (Many-to-Many)
Student.belongsToMany(Course, {
	through: StudentCourse,
	foreignKey: "student_id",
	otherKey: "course_id",
});
Course.belongsToMany(Student, {
	through: StudentCourse,
	foreignKey: "course_id",
	otherKey: "student_id",
});

// Doctor <-> Course (One-to-Many)
Doctor.hasMany(Course, { foreignKey: "doctor_id" });
Course.belongsTo(Doctor, { foreignKey: "doctor_id" });

// Course <-> Faculty (One-to-Many)
Course.belongsTo(Faculty, { foreignKey: "faculty_id" });
Faculty.hasMany(Course, { foreignKey: "faculty_id" });

// Faculty <-> Level (One-to-Many)
Faculty.hasMany(Level, { foreignKey: "faculty_id" });
Level.belongsTo(Faculty, { foreignKey: "faculty_id" });

// Course <-> Level (One-to-Many)
Course.belongsTo(Level, { foreignKey: "level_id" });
Level.hasMany(Course, { foreignKey: "level_id" });

// Course <-> Lecture (One-to-Many)
Course.hasMany(Lecture, { foreignKey: "course_id" });
Lecture.belongsTo(Course, { foreignKey: "course_id" });

// Course <-> File (One-to-Many)
Course.hasMany(Document, { foreignKey: "course_id" });
Document.belongsTo(Course, { foreignKey: "course_id" });

// Course <-> Quiz (One-to-Many)
Course.hasMany(Quiz, { foreignKey: "course_id" });
Quiz.belongsTo(Course, { foreignKey: "course_id" });

// Quiz <-> Question (One-to-Many)
Quiz.hasMany(Question, { foreignKey: "quiz_id" });
Question.belongsTo(Quiz, { foreignKey: "quiz_id" });

// Question <-> Answer (One-to-Many)
Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

// User <-> UserAnswer (One-to-Many)
User.hasMany(UserAnswer, { foreignKey: "user_id" });
UserAnswer.belongsTo(User, { foreignKey: "user_id" });

// Question <-> UserAnswer (One-to-Many)
Question.hasMany(UserAnswer, { foreignKey: "question_id" });
UserAnswer.belongsTo(Question, { foreignKey: "question_id" });

// Answer <-> UserAnswer (One-to-Many)
Answer.hasMany(UserAnswer, { foreignKey: "answer_id" });
UserAnswer.belongsTo(Answer, { foreignKey: "answer_id" });

// Add these lines to define the associations for StudentCourse
StudentCourse.belongsTo(Student, { foreignKey: "student_id" });
StudentCourse.belongsTo(Course, { foreignKey: "course_id" });
Student.hasMany(StudentCourse, { foreignKey: "student_id" });
Course.hasMany(StudentCourse, { foreignKey: "course_id" });

export {
	User,
	Doctor,
	Student,
	Course,
	Faculty,
	Level,
	Lecture,
	Document,
	Quiz,
	Question,
	Answer,
	UserAnswer,
	StudentCourse,
};
