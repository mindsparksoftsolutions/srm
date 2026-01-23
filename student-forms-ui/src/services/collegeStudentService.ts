import axios from 'axios';

// Local Development URL
// Local Development URL
// const API_URL = 'http://localhost:5078/api/CollegeStudents';
// Production URL (Uncomment when deploying)
const API_URL = 'https://srm-reapi.vedhamsmidway.com/api/CollegeStudents';

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
}

export const getCollegeStudents = async () => {
    const response = await axios.get<CollegeStudent[]>(API_URL);
    return response.data;
};

export const getCollegeCount = async () => {
    const response = await axios.get<{ college: string; count: number }[]>(`${API_URL}/counts`);
    return response.data;
};

export const getCollegeStudent = async (id: string) => {
    const response = await axios.get<CollegeStudent>(`${API_URL}/${id}`);
    return response.data;
};

export const createCollegeStudent = async (student: CollegeStudent) => {
    const response = await axios.post<CollegeStudent>(API_URL, student);
    return response.data;
};

export const updateCollegeStudent = async (id: string, student: CollegeStudent) => {
    await axios.put(`${API_URL}/${id}`, student);
};

export const deleteCollegeStudent = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};
