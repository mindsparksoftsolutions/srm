import api from './api';

export interface CollegeStudent {
    id?: string;
    studentName: string;
    gender: string;
    department: string;
    mobileNumber: string;
    email: string;
    collegeNameLocation: string;
    yearOfStudy?: string;
    registerNumber?: string;
    website?: string;
}

export const getCollegeStudents = async () => {
    const response = await api.get<CollegeStudent[]>('/CollegeStudents');
    return response.data;
};

export const getCollegeCount = async () => {
    const response = await api.get<{ college: string; count: number }[]>('/CollegeStudents/counts');
    return response.data;
};

export const getCollegeStudent = async (id: string) => {
    const response = await api.get<CollegeStudent>(`/CollegeStudents/${id}`);
    return response.data;
};

export const createCollegeStudent = async (student: CollegeStudent) => {
    const response = await api.post<CollegeStudent>('/CollegeStudents', student);
    return response.data;
};

export const updateCollegeStudent = async (id: string, student: CollegeStudent) => {
    await api.put(`/CollegeStudents/${id}`, student);
};

export const deleteCollegeStudent = async (id: string) => {
    await api.delete(`/CollegeStudents/${id}`);
};
