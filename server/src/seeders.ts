import { faker } from "@faker-js/faker";
import type { Sequelize } from "sequelize";
import {
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
} from "./models";
import { UserRole } from "./models/User";
import bcrypt from "bcryptjs";

export const seedData = async (sequelize: Sequelize) => {
	// check if system have one user
	const users = await User.findAll();
	if (users.length > 0) {
		console.log("System have users, seeding is not allowed");
		return;
	}

	try {
		await sequelize.sync({ force: true });

		// Seed Faculties
		const faculties = await Promise.all(
			Array(5)
				.fill(null)
				.map(() =>
					Faculty.create({
						name: faker.company.name(),
					}),
				),
		);

		// Seed Levels
		const levels = await Promise.all(
			Array(4)
				.fill(null)
				.map(() =>
					Level.create({
						name: `Level ${faker.number.int({ min: 1, max: 4 })}`,
						faculty_id: faker.helpers.arrayElement(faculties).id,
					}),
				),
		);

		// base user with bcrypt hashed password
		const hashedPassword = await bcrypt.hash("01000000000", 10);
		const baseUser = await User.create({
			name: "admin",
			phone: "01000000000",
			password: hashedPassword,
			role: UserRole.ADMIN,
		});

		// Create a specific test student
		const testStudentUser = await User.create({
			name: "Test Student",
			phone: "01100000000",
			password: hashedPassword,
			role: UserRole.STUDENT,
			platform: "Android",
			manufacturer: "Gulgowski, McLaughlin and D'Amore",
			model: "Larkin LLC 6",
			device_id: "f1c4cdc9-f135-47bf-bf74-17425c96dc31",
			notification_token: faker.string.alphanumeric(30),
		});

		const testStudent = await Student.create({
			faculty_id: faker.helpers.arrayElement(faculties).id,
			level_id: faker.helpers.arrayElement(levels).id,
			user_id: testStudentUser.id,
		});

		// Seed Users (including base user and test student)
		const users = await Promise.all(
			Array(999) // Reduced to 999 to account for the test student
				.fill(null)
				.map(async () => {
					const role = faker.helpers.arrayElement(Object.values(UserRole));
					const [user] = await User.findOrCreate({
						where: { phone: faker.phone.number({ style: "international" }) },
						defaults: {
							name: faker.person.fullName(),
							password: hashedPassword,
							role: role,
							platform: faker.helpers.arrayElement(["iOS", "Android", "Web"]),
							manufacturer: faker.company.name(),
							model: `${faker.company.name()} ${faker.number.int({ min: 1, max: 10 })}`,
							device_id: faker.string.uuid(),
							notification_token: faker.string.alphanumeric(30),
						},
					});
					return user;
				}),
		);

		// Add the test student to the users array
		users.push(testStudentUser);

		// Seed Doctors
		const doctors = await Promise.all(
			users
				.filter((u) => u.role === UserRole.DOCTOR)
				.map((user) =>
					Doctor.create({
						image: faker.image.avatar(),
						job_title: faker.person.jobTitle(),
						user_id: user.id,
					}),
				),
		);

		// Seed Students
		const students = await Promise.all(
			users
				.filter((u) => u.role === UserRole.STUDENT)
				.map((user) =>
					Student.create({
						faculty_id: faker.helpers.arrayElement(faculties).id,
						level_id: faker.helpers.arrayElement(levels).id,
						user_id: user.id,
					}),
				),
		);

		// Seed Courses
		const courses = await Promise.all(
			Array(100)
				.fill(null)
				.map(async () => {
					const [course] = await Course.findOrCreate({
						where: {
							title: faker.lorem.words(3),
							faculty_id: faker.helpers.arrayElement(faculties).id,
							level_id: faker.helpers.arrayElement(levels).id,
						},
						defaults: {
							description: faker.lorem.paragraph(),
							image: faker.image.url(),
							price: faker.number.float({
								min: 50,
								max: 500,
								multipleOf: 0.01,
							}),
							semester: faker.helpers.arrayElement(["first", "second"]),
							doctor_id: faker.helpers.arrayElement(doctors).id,
						},
					});
					return course;
				}),
		);

		// Seed StudentCourses
		await Promise.all(
			Array(2000)
				.fill(null)
				.map(async () => {
					const studentId = faker.helpers.arrayElement(students).id;
					const courseId = faker.helpers.arrayElement(courses).id;

					await StudentCourse.findOrCreate({
						where: {
							student_id: studentId,
							course_id: courseId,
						},
					});
				}),
		);

		// Seed Lectures
		await Promise.all(
			Array(500)
				.fill(null)
				.map(async () => {
					await Lecture.findOrCreate({
						where: {
							title: faker.lorem.sentence(),
							course_id: faker.helpers.arrayElement(courses).id,
						},
						defaults: {
							link: faker.internet.url(),
							is_free: faker.datatype.boolean(),
							duration: `${faker.number.int({ min: 10, max: 120 })} minutes`,
						},
					});
				}),
		);

		// Seed Documents
		await Promise.all(
			Array(300)
				.fill(null)
				.map(() =>
					Document.create({
						title: faker.lorem.words(3),
						link: faker.internet.url(),
						is_free: faker.datatype.boolean(),
						course_id: faker.helpers.arrayElement(courses).id,
					}),
				),
		);

		// Seed Quizzes
		const quizzes = await Promise.all(
			Array(200)
				.fill(null)
				.map(async () => {
					const [quiz] = await Quiz.findOrCreate({
						where: {
							title: faker.lorem.sentence(),
							course_id: faker.helpers.arrayElement(courses).id,
						},
					});
					return quiz;
				}),
		);

		// Seed Questions
		const questions = await Promise.all(
			Array(1000)
				.fill(null)
				.map(() =>
					Question.create({
						text: faker.lorem.sentence(),
						quiz_id: faker.helpers.arrayElement(quizzes).id,
					}),
				),
		);

		// Seed Answers
		const answers = await Promise.all(
			Array(1000)
				.fill(null)
				.map(() =>
					Answer.create({
						text: faker.lorem.sentence(),
						isCorrect: faker.datatype.boolean(),
						question_id: faker.helpers.arrayElement(questions).id,
					}),
				),
		);

		// Seed UserAnswers
		await Promise.all(
			Array(1000)
				.fill(null)
				.map(() =>
					UserAnswer.create({
						user_id: faker.helpers.arrayElement(users).id,
						question_id: faker.helpers.arrayElement(questions).id,
						answer_id: faker.helpers.arrayElement(answers).id,
					}),
				),
		);

		console.log("Seeding completed successfully");
	} catch (error) {
		console.error("Seeding failed:", error);
	}
};
