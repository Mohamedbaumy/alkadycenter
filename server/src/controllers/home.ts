import { sendResponse } from "../middlewares/errorHandler";
import type { Request, Response } from "express";
import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import Course from "../models/Course";
import Lecture from "../models/Lecture";
import Quiz from "../models/Quiz";
import Document from "../models/Document";
import StudentCourse from "../models/StudentCourse";
import { Doctor } from "../models";

interface CourseResponse {
	id: number;
	title: string;
	image: string;
	doctor_name: string;
	doctor_image: string;
	doctor_job_title: string;
	price: string;
	no_of_lectures: number;
	no_of_documents: number;
	no_of_students: number;
}

interface DoctorResponse {
	user_id: number;
	doctor_id: number;
	name: string;
	image: string;
	no_of_courses: number;
	job_title: string;
}

export const getAllCourses = async (req: Request, res: Response) => {
	try {
		const {
			page = 1,
			order_type = "new",
			faculty_id,
			level_id,
			term,
			query,
		} = req.query;

		const limit = 10;
		const offset = (Number(page) - 1) * limit;

		let sqlQuery = `
			SELECT 
				c.id, 
				c.title, 
				c.image, 
				u.name AS doctor_name, 
				d.image AS doctor_image, 
				d.job_title AS doctor_job_title, 
				c.price, 
				(SELECT COUNT(*) FROM lectures l WHERE l.course_id = c.id) AS no_of_lectures,
				(SELECT COUNT(*) FROM documents d WHERE d.course_id = c.id) AS no_of_documents,
				(SELECT COUNT(*) FROM StudentCourses sc WHERE sc.course_id = c.id) AS no_of_students
			FROM 
				courses c
			LEFT JOIN 
				doctors d ON c.doctor_id = d.id
			LEFT JOIN 
				users u ON d.user_id = u.id
			WHERE 1=1
		`;

		const queryParams: any = {};

		if (faculty_id && faculty_id !== "0") {
			sqlQuery += " AND c.faculty_id = :faculty_id";
			queryParams.faculty_id = faculty_id;
		}

		if (level_id && level_id !== "0") {
			sqlQuery += " AND c.level_id = :level_id";
			queryParams.level_id = level_id;
		}

		if (term) {
			const semester = Number(term) === 1 ? "first" : "second";
			sqlQuery += " AND c.semester = :semester";
			queryParams.semester = semester;
		}

		if (query) {
			sqlQuery += " AND (c.title LIKE :query OR u.name LIKE :query)";
			queryParams.query = `%${query}%`;
		}

		if (order_type === "popular") {
			sqlQuery += " ORDER BY no_of_students DESC";
		} else {
			sqlQuery += " ORDER BY c.createdAt DESC";
		}

		sqlQuery += " LIMIT :limit OFFSET :offset";
		queryParams.limit = limit;
		queryParams.offset = offset;

		const courses: CourseResponse[] = await sequelize.query(sqlQuery, {
			type: QueryTypes.SELECT,
			replacements: queryParams,
		});

		const formattedCourses = courses.map((course) => ({
			...course,
			price: `${course.price} جنيه`,
		}));

		sendResponse(res, "courses", formattedCourses, true);
	} catch (error) {
		sendResponse(res, "Error fetching courses", error, false);
	}
};

export const getTopCourses = async (req: Request, res: Response) => {
	try {
		const topCourses: CourseResponse[] = await sequelize.query(
			`
			SELECT 
				c.id, 
				c.title, 
				c.image, 
				u.name AS doctor_name, 
				d.image AS doctor_image, 
				d.job_title AS doctor_job_title, 
				c.price, 
                (SELECT COUNT(*) FROM lectures v WHERE v.course_id = c.id) AS no_of_lectures,
				(SELECT COUNT(*) FROM documents d WHERE d.course_id = c.id) AS no_of_documents,
                (SELECT COUNT(*) FROM StudentCourses sc WHERE sc.course_id = c.id) AS no_of_students
			FROM 
				courses c
			LEFT JOIN 
				doctors d ON c.doctor_id = d.id
			LEFT JOIN 
				users u ON d.user_id = u.id
			ORDER BY 
				no_of_students DESC
			LIMIT 10
		`,
			{ type: QueryTypes.SELECT },
		);

		const formattedTopCourses = topCourses.map((course) => ({
			...course,
			price: `${course.price} جنيه`,
		}));

		sendResponse(res, "top_courses", formattedTopCourses, true);
	} catch (error) {
		sendResponse(res, "Error fetching top courses", error, false);
	}
};

export const getDoctors = async (req: Request, res: Response) => {
	try {
		const doctors: DoctorResponse[] = await sequelize.query(
			`
			SELECT 
				d.id AS doctor_id, 
				d.user_id, 
				u.name, 
				d.image, 
				(SELECT COUNT(*) FROM courses c WHERE c.doctor_id = d.id) AS no_of_courses,
				d.job_title
			FROM 
				doctors d
			LEFT JOIN 
				users u ON d.user_id = u.id
		`,
			{ type: QueryTypes.SELECT },
		);

		sendResponse(res, "doctors", doctors, true);
	} catch (error) {
		sendResponse(res, "Error fetching doctors", error, false);
	}
};

// top 10 doctors have most students
export const getTopDoctors = async (req: Request, res: Response) => {
	try {
		const topDoctors: DoctorResponse[] = await sequelize.query(
			`
			SELECT 
				d.id AS doctor_id, 
				d.user_id, 
				u.name, 
				d.image, 
				d.job_title,
				(SELECT COUNT(*) FROM courses c WHERE c.doctor_id = d.id) AS no_of_courses,
				(SELECT COUNT(DISTINCT sc.student_id) FROM StudentCourses sc JOIN courses c ON sc.course_id = c.id WHERE c.doctor_id = d.id) AS no_of_students
			FROM 
				doctors d
			LEFT JOIN 
				users u ON d.user_id = u.id
			ORDER BY 
				no_of_students DESC
			LIMIT 10
		`,
			{ type: QueryTypes.SELECT },
		);

		sendResponse(res, "top_doctors", topDoctors, true);
	} catch (error) {
		sendResponse(res, "Error fetching top doctors", error, false);
	}
};

export const getDoctorCourses = async (req: Request, res: Response) => {
	try {
		const { doctor_id } = req.params;
		const courses: CourseResponse[] = await sequelize.query(
			`
			SELECT 
				c.id, 
				c.title,
				c.image,
				u.name AS doctor_name,
				d.image AS doctor_image,
				d.job_title AS doctor_job_title,
				c.price,
				(SELECT COUNT(*) FROM lectures l WHERE l.course_id = c.id) AS no_of_lectures,
				(SELECT COUNT(*) FROM documents d WHERE d.course_id = c.id) AS no_of_documents
			FROM 
				courses c
			LEFT JOIN 
				doctors d ON c.doctor_id = d.id
			LEFT JOIN 
				users u ON d.user_id = u.id
			WHERE 
				c.doctor_id = :doctor_id
		`,
			{ type: QueryTypes.SELECT, replacements: { doctor_id } },
		);

		const formattedCourses = courses.map((course) => ({
			...course,
			price: `${course.price} جنيه`,
		}));

		sendResponse(res, "doctor_courses", formattedCourses, true);
	} catch (error) {
		sendResponse(res, "Error fetching doctor courses", error, false);
	}
};

/**
 * show course
 * {
        "student_name": "انوس",
        "student_phone_number": "01004725227",
        "id": 117,
        "title": "Production",
        "description": "م/ شريف يوسف",
        "image": "https://el-da7ee7.com/gmS1gBS6N1plepfpcPCi/uploaded/courses/f3y40WjYMa74oSYoiuOm.jpeg",
        "doctor_name": "م/ شريف يوسف",
        "doctor_job_title": "مدرس مساعد بقسم ميكانيكا انتاج هندسة الزقازيق",
        "doctor_image": "https://el-da7ee7.com/gmS1gBS6N1plepfpcPCi/uploaded/doctors/RTDfTIShvA87NdzL4ehu.jpeg",
        "price": "2000.00 جنيه",
        "no_of_lectures": 17,
        "no_of_documents": 0,
        "is_bought": false,
        "lectures": [
            {
                "id": 745,
                "title": "Session 1",
                "link": "https://youtu.be/GlZiGRKlX-M",
                "is_free": false,
                "duration": "30:00"
            },
            {
                "id": 748,
                "title": "Session 2",
                "link": "https://youtu.be/aMJswhZauMo?feature=shared",
                "is_free": false,
                "duration": "13:27"
            },
            {
                "id": 749,
                "title": "Session 3",
                "link": "https://youtu.be/73VB5y_WPJc",
                "is_free": false,
                "duration": "32:26"
            },
            {
                "id": 750,
                "title": "Session 4",
                "link": "https://youtu.be/fzSRDPhLVAY",
                "is_free": false,
                "duration": "35:32"
            },
            {
                "id": 751,
                "title": "Session 5",
                "link": "https://youtu.be/XBzde9UKkbs",
                "is_free": false,
                "duration": "30:07"
            },
            {
                "id": 752,
                "title": "Session 6",
                "link": "https://youtu.be/5B72TWHqh5M",
                "is_free": false,
                "duration": "20:07"
            },
            {
                "id": 753,
                "title": "Session 7",
                "link": "https://youtu.be/UlORLEpRBKU?feature=shared",
                "is_free": false,
                "duration": "3:57"
            },
            {
                "id": 754,
                "title": "Session 8",
                "link": "https://youtu.be/zcT8kXNKSl4",
                "is_free": false,
                "duration": "24:55"
            },
            {
                "id": 755,
                "title": "Session 9",
                "link": "https://youtu.be/wfjd0hzo1qQ",
                "is_free": false,
                "duration": "16:28"
            },
            {
                "id": 756,
                "title": "Session 10",
                "link": "https://youtu.be/5Tn2fkCpSDU",
                "is_free": false,
                "duration": "14:30"
            },
            {
                "id": 757,
                "title": "Session 11",
                "link": "https://youtu.be/3L5NtniOHF4",
                "is_free": false,
                "duration": "3:07"
            },
            {
                "id": 758,
                "title": "Session 12",
                "link": "https://youtu.be/O06KdPdVzb0?feature=shared",
                "is_free": false,
                "duration": "37:13"
            },
            {
                "id": 759,
                "title": "Session 13",
                "link": "https://youtu.be/xE4YTeWHZb8",
                "is_free": false,
                "duration": "13:43"
            },
            {
                "id": 760,
                "title": "Session 14",
                "link": "https://youtu.be/5Tn2fkCpSDU",
                "is_free": false,
                "duration": "24:30"
            },
            {
                "id": 761,
                "title": "Session 15",
                "link": "https://youtu.be/BzW6NN2hxoQ?feature=shared",
                "is_free": false,
                "duration": "17:06"
            },
            {
                "id": 762,
                "title": "Session 16",
                "link": "https://youtu.be/_4P2tIfcN_U?feature=shared",
                "is_free": false,
                "duration": "33:54"
            },
            {
                "id": 763,
                "title": "Session 17",
                "link": "https://youtu.be/KzuW3taaR3g",
                "is_free": false,
                "duration": "25:50"
            }
        ],
        "documents": [],
        "quizzes": []
    },
 */

interface LectureResponse {
	id: number;
	title: string;
	link: string;
	is_free: boolean;
	duration: string;
}

interface DocumentResponse {
	id: number;
	title: string;
	link: string;
}

interface QuizResponse {
	id: number;
	title: string;
}

interface CourseResponse {
	student_name: string;
	student_phone_number: string;
	id: number;
	title: string;
	description: string;
	image: string;
	doctor_name: string;
	doctor_job_title: string;
	doctor_image: string;
	price: string;
	no_of_lectures: number;
	no_of_documents: number;
	is_bought: boolean;
	lectures: LectureResponse[];
	documents: DocumentResponse[];
	quizzes: QuizResponse[];
}

export const getCourse = async (req: UserRequest, res: Response) => {
	try {
		const { course_id } = req.params;
		const student = req.user;
		const course = await Course.findByPk(course_id, {
			attributes: ["id", "title", "description", "image", "price", "doctor_id"],
		});
		if (!course) {
			return sendResponse(res, "Course not found", null, false);
		}

		const courseStudent = await StudentCourse.findOne({
			where: { student_id: student?.id, course_id: course.id },
		});
		const is_bought = !!courseStudent;
		const doctor = await sequelize.query(
			`SELECT name AS doctor_name,
			 image AS doctor_image, job_title AS doctor_job_title FROM doctors d
			 LEFT JOIN users u ON d.user_id = u.id
			 WHERE d.id = :doctor_id`,
			{
				type: QueryTypes.SELECT,
				replacements: { doctor_id: course.doctor_id },
			},
		);
		const lectures = await Lecture.findAll({
			where: { course_id: course.id },
			attributes: ["id", "title", "link", "is_free", "duration"],
		});
		const documents = await Document.findAll({
			where: { course_id: course.id },
			attributes: ["id", "title", "link"],
		});
		const quizzes = await Quiz.findAll({
			where: { course_id: course.id },
			attributes: ["id", "title"],
		});
		const courseResponse: CourseResponse = {
			...course.get(),
			is_bought,
			student_name: student?.name as string,
			student_phone_number: student?.phone as string,
			...doctor[0],
			price: `${course.price} جنيه`,
			no_of_lectures: lectures.length,
			no_of_documents: documents.length,
			lectures: lectures as LectureResponse[],
			documents: documents as DocumentResponse[],
			quizzes: quizzes as QuizResponse[],
		};

		sendResponse(res, "course", courseResponse, true);
	} catch (error) {
		sendResponse(res, "Error fetching course", error, false);
	}
};
