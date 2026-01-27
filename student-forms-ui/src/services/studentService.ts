import api from './api';

export interface Student {
    id?: string;
    studentNameFatherInitial: string;
    gender: string;
    class: string;
    section: string;
    schoolNameLocation: string;
    emisNumber?: string | number;
    website?: string;
}

export const getStudentCount = async () => {
    const response = await api.get<{ school: string; count: number }[]>('/Students/counts');
    return response.data;
};

export const getStudents = async () => {
    const response = await api.get<Student[]>('/Students');
    return response.data;
};

export const getStudent = async (id: string) => {
    const response = await api.get<Student>(`/Students/${id}`);
    return response.data;
};

export const createStudent = async (student: Student) => {
    const response = await api.post<Student>('/Students', student);
    return response.data;
};

export const updateStudent = async (id: string, student: Student) => {
    await api.put(`/Students/${id}`, student);
};

export const deleteStudent = async (id: string) => {
    await api.delete(`/Students/${id}`);
};
