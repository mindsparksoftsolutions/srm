import axios from 'axios';

// Local Development URL
// Local Development URL
// const API_URL = 'http://localhost:5078/api/Students';
// Production URL (Uncomment when deploying)
const API_URL = 'https://srm-reapi.vedhamsmidway.com/api/Students';

export interface Student {
    id?: string;
    studentNameFatherInitial: string;
    gender: string;
    class: string;
    section: string;
    schoolNameLocation: string;
    emisNumber?: string | number;
}

export const getStudentCount = async () => {
    const response = await axios.get<{ school: string; count: number }[]>(`${API_URL}/counts`);
    return response.data;
};

export const getStudents = async () => {
    const response = await axios.get<Student[]>(API_URL);
    return response.data;
};

export const getStudent = async (id: string) => {
    const response = await axios.get<Student>(`${API_URL}/${id}`);
    return response.data;
};

export const createStudent = async (student: Student) => {
    const response = await axios.post<Student>(API_URL, student);
    return response.data;
};

export const updateStudent = async (id: string, student: Student) => {
    await axios.put(`${API_URL}/${id}`, student);
};

export const deleteStudent = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};
