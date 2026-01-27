import api from './api';

export interface EventDetail {
    id: string;
    eventType: string; // "Student" or "College"
    date: string;
    venue: string;
    isActive: boolean;
}

// Get ALL events for admin
export const getAllEvents = async () => {
    const response = await api.get<EventDetail[]>('/Events');
    return response.data;
};

// Create new event
export const createEvent = async (event: Omit<EventDetail, 'id' | 'isActive'>) => {
    const response = await api.post<EventDetail>('/Events', event);
    return response.data;
};

// Update existing event
export const updateEvent = async (id: string, event: EventDetail) => {
    await api.put(`/Events/${id}`, event);
};

// Activate an event (and deactivate others of same type)
export const activateEvent = async (id: string) => {
    await api.put(`/Events/${id}/activate`);
};

// Delete event
export const deleteEvent = async (id: string) => {
    await api.delete(`/Events/${id}`);
};
