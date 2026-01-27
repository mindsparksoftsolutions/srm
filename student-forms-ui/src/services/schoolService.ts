import api from './api';

export interface School {
    id: string;
    name: string;
}

// Public: Get all schools
export const getSchools = async () => {
    const response = await api.get<School[]>('/Schools');
    // Map to just names if needed by components, or return objects
    // The current components expect strings for dropdowns, but we might want objects for CRUD.
    // For now, let's keep it flexible.
    return response.data;
};

// Admin: Create 
export const createSchool = async (school: { name: string }) => {
    const response = await api.post<School>('/Schools', school);
    return response.data;
};

// Admin: Update
export const updateSchool = async (id: string, school: { id: string; name: string }) => {
    await api.put(`/Schools/${id}`, school);
};

// Admin: Delete
export const deleteSchool = async (id: string) => {
    await api.delete(`/Schools/${id}`);
};
