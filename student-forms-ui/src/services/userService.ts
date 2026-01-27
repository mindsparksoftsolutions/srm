import axios from 'axios';

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5078/api/Users'
    : 'https://srm-reapi.vedhamsmidway.com/api/Users';

export interface User {
    id: number;
    username: string;
    role: string;
    password?: string; // Optional for listing, required for creation
}

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post(API_URL, user, getAuthHeader());
    return response.data;
};

export const updateUser = async (id: number, user: User): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, user, getAuthHeader());
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
};
