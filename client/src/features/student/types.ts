export interface User {
  id: number;
  name: string;
  phone: string;
  password: string;
}

export interface Student {
  id: number;
  faculty_id: number;
  level_id: number;
  User: User;
}

export interface ApiResponse {
  data: {
    students: Student[];
    totalPages: number;
    currentPage: number;
  };
  is_authorized: boolean;
}
