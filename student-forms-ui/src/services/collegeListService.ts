import api from './api';

export interface College {
    id: string;
    name: string;
}

// Public: Get all colleges
export const getColleges = async () => {
    const response = await api.get<College[]>('/Colleges');
    return response.data;
};

// Admin: Create 
export const createCollege = async (college: { name: string }) => {
    const response = await api.post<College>('/Colleges', college);
    return response.data;
};

// Admin: Update
export const updateCollege = async (id: string, college: { id: string; name: string }) => {
    await api.put(`/Colleges/${id}`, college);
};

// Admin: Delete
export const deleteCollege = async (id: string) => {
    await api.delete(`/Colleges/${id}`);
};
