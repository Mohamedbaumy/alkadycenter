export interface Faculty {
	id: number;
	name: string;
	Levels: Level[];
}

export interface Level {
	id: number;
	name: string;
	faculty_id: number;
}

export interface ApiResponse {
	data: Faculty[];
	is_authorized: boolean;
	msg: string;
	status: boolean;
}
