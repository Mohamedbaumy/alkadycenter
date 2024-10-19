export interface User {
	id: number;
	name: string;
	phone: string;
	password: string;
}

export interface Doctor {
	id: number;
	name: string;
	phone: string;
	job_title: string;
	image: string;
	password: string;
	User: User;
}

export interface ApiResponse {
	data: {
		doctors: Doctor[];
		totalPages: number;
		currentPage: number;
	};
	is_authorized: boolean;
	msg: string;
	status: boolean;
}
