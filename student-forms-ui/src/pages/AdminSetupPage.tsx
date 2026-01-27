import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, CheckCircle, Circle, Save, X, School as SchoolIcon, Calendar, GraduationCap, Pencil } from 'lucide-react';
import { getAllEvents, createEvent, updateEvent, activateEvent, deleteEvent } from '../services/eventService';
import type { EventDetail } from '../services/eventService';
import { getSchools, createSchool, updateSchool, deleteSchool } from '../services/schoolService';
import { getColleges, createCollege, updateCollege, deleteCollege } from '../services/collegeListService';
import { getUsers, createUser, deleteUser } from '../services/userService';
import type { User } from '../services/userService';
import ConfirmationModal from '../components/ConfirmationModal';
import { User as UserIcon } from 'lucide-react';

// --- Shared Types ---
interface ConfirmState {
    isOpen: boolean;
    id: string | null;
    title: string;
    message: string;
    action: () => Promise<void>;
}

// --- Tab Components ---

const EventTab: React.FC = () => {
    const [events, setEvents] = useState<EventDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreating, setIsCreating] = useState<{ type: string | null }>({ type: null });
    const [newEvent, setNewEvent] = useState({ date: '', venue: '' });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ date: '', venue: '' });

    // Confirmation State
    const [confirm, setConfirm] = useState<ConfirmState>({ isOpen: false, id: null, title: '', message: '', action: async () => { } });

    useEffect(() => { loadEvents(); }, []);

    const loadEvents = async () => {
        try {
            if (events.length === 0) setLoading(true);
            const data = await getAllEvents();
            setEvents(data);
        } catch (error) { toast.error("Failed to load events"); } finally { setLoading(false); }
    };

    const handleCreate = async (type: string) => {
        if (!newEvent.date || !newEvent.venue) { toast.error("Please fill all fields"); return; }
        try {
            setIsSubmitting(true);
            await createEvent({ ...newEvent, eventType: type });
            toast.success("Event created");
            setIsCreating({ type: null });
            setNewEvent({ date: '', venue: '' });
            await loadEvents();
        } catch { toast.error("Failed to create event"); } finally { setIsSubmitting(false); }
    };

    const handleUpdate = async (id: string, originalEvent: EventDetail) => {
        try {
            setProcessingId(id);
            await updateEvent(id, { ...originalEvent, ...editForm });
            toast.success("Event updated");
            setEditingId(null);
            await loadEvents();
        } catch { toast.error("Failed to update event"); } finally { setProcessingId(null); }
    };

    const handleActivate = async (id: string, type: string) => {
        try {
            setProcessingId(id);
            await activateEvent(id);
            toast.success(`${type} event activated!`);
            await loadEvents();
        } catch { toast.error("Failed to activate event"); } finally { setProcessingId(null); }
    };

    const confirmDelete = (id: string) => {
        setConfirm({
            isOpen: true,
            id,
            title: "Delete Event",
            message: "Are you sure you want to delete this event? This action cannot be undone.",
            action: async () => await handleDelete(id)
        });
    };

    const handleDelete = async (id: string) => {
        try {
            setConfirm(prev => ({ ...prev, isOpen: false })); // Close modal first
            setProcessingId(id);
            await deleteEvent(id);
            toast.success("Event deleted");
            await loadEvents();
        } catch { toast.error("Failed to delete event"); } finally { setProcessingId(null); }
    };

    const startEditing = (event: EventDetail) => {
        setEditingId(event.id);
        setEditForm({ date: event.date, venue: event.venue });
    };

    const renderTable = (title: string, type: string) => {
        const typeEvents = events.filter(e => e.eventType === type);
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
                <div className="bg-[#1e6091] text-white py-3 px-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={() => setIsCreating({ type })} disabled={isSubmitting || !!isCreating.type} className="bg-white text-[#1e6091] px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1 hover:bg-gray-100 disabled:opacity-50"><Plus className="h-4 w-4" /> Add New</button>
                </div>
                {isCreating.type === type && (
                    <div className="p-4 bg-blue-50 border-b border-blue-100 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input placeholder="Date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="px-3 py-2 border rounded" disabled={isSubmitting} />
                            <input placeholder="Venue" value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} className="px-3 py-2 border rounded" disabled={isSubmitting} />
                            <div className="flex gap-2">
                                <button onClick={() => handleCreate(type)} disabled={isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded flex-1 flex items-center justify-center">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}</button>
                                <button onClick={() => setIsCreating({ type: null })} disabled={isSubmitting} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead><tr className="bg-gray-50 border-b border-gray-200"><th className="p-4 w-16 text-center">Active</th><th className="p-4">Date</th><th className="p-4">Venue</th><th className="p-4 text-right">Actions</th></tr></thead>
                    <tbody>
                        {typeEvents.map(event => (
                            <tr key={event.id} className={`border-b border-gray-100 ${event.isActive ? 'bg-blue-50/50' : ''}`}>
                                <td className="p-4 text-center">
                                    {processingId === event.id && !editingId ? <Loader2 className="h-6 w-6 animate-spin text-blue-500 mx-auto" /> : event.isActive ? <CheckCircle className="h-6 w-6 text-green-500 fill-green-100 mx-auto" /> : <button onClick={() => handleActivate(event.id, type)} disabled={!!processingId} className="text-gray-300 hover:text-green-500 disabled:opacity-30"><Circle className="h-6 w-6" /></button>}
                                </td>
                                {editingId === event.id ? (
                                    <>
                                        <td className="p-4"><input value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} className="w-full px-2 py-1 border rounded" disabled={!!processingId} /></td>
                                        <td className="p-4"><input value={editForm.venue} onChange={e => setEditForm({ ...editForm, venue: e.target.value })} className="w-full px-2 py-1 border rounded" disabled={!!processingId} /></td>
                                        <td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleUpdate(event.id, event)} disabled={!!processingId} className="text-green-600 p-1">{processingId === event.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}</button><button onClick={() => setEditingId(null)} disabled={!!processingId} className="text-gray-500 p-1"><X className="h-5 w-5" /></button></div></td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4">{event.date}</td><td className="p-4 truncate max-w-xs">{event.venue}</td>
                                        <td className="p-4 text-right"><div className="flex justify-end gap-3"><button onClick={() => startEditing(event)} disabled={!!processingId} className="text-blue-600 hover:underline text-sm disabled:opacity-50">Edit</button><button onClick={() => confirmDelete(event.id)} disabled={!!processingId} className="text-red-500 p-1 disabled:opacity-50">{processingId === event.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}</button></div></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-[#1e6091]" /></div>;
    return (
        <div>
            {renderTable("Student Events", "Student")}
            {renderTable("College Events", "College")}
            <ConfirmationModal
                isOpen={confirm.isOpen}
                onClose={() => setConfirm(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirm.action}
                title={confirm.title}
                message={confirm.message}
            />
        </div>
    );
};

const ListTab: React.FC<{ type: 'School' | 'College' }> = ({ type }) => {
    const isSchool = type === 'School';
    const [items, setItems] = useState<{ id: string, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const [newName, setNewName] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    // Confirmation State
    const [confirm, setConfirm] = useState<ConfirmState>({ isOpen: false, id: null, title: '', message: '', action: async () => { } });

    const fetchItems = async () => {
        try {
            if (items.length === 0) setLoading(true); // Initial load only
            const data = isSchool ? await getSchools() : await getColleges();
            setItems(data);
        } catch { toast.error(`Failed to load ${type}s`); } finally { setLoading(false); }
    };

    useEffect(() => { fetchItems(); }, [type]);

    const handleCreate = async () => {
        if (!newName.trim()) return;
        try {
            setSubmitting(true);
            if (isSchool) await createSchool({ name: newName }); else await createCollege({ name: newName });
            toast.success("Added successfully");
            setNewName('');
            await fetchItems();
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error(error.response.data);
            } else {
                toast.error("Failed to add");
            }
        } finally { setSubmitting(false); }
    };

    const handleUpdate = async (id: string) => {
        if (!editName.trim()) return;
        try {
            setProcessingId(id);
            if (isSchool) await updateSchool(id, { id, name: editName }); else await updateCollege(id, { id, name: editName });
            toast.success("Updated successfully");
            setEditingId(null);
            await fetchItems();
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error(error.response.data);
            } else {
                toast.error("Failed to update");
            }
        } finally { setProcessingId(null); }
    };

    const confirmDelete = (id: string) => {
        setConfirm({
            isOpen: true,
            id,
            title: `Delete ${type}`,
            message: `Are you sure you want to delete this ${type}? This action cannot be undone.`,
            action: async () => await handleDelete(id)
        });
    };

    const handleDelete = async (id: string) => {
        try {
            setConfirm(prev => ({ ...prev, isOpen: false }));
            setProcessingId(id);
            if (isSchool) await deleteSchool(id); else await deleteCollege(id);
            toast.success("Deleted successfully");
            await fetchItems();
        } catch { toast.error("Failed to delete"); } finally { setProcessingId(null); }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-[#1e6091]" /></div>;

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-2">
                <input
                    placeholder={`Add new ${type}...`}
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1e6091]"
                    disabled={submitting}
                    onKeyDown={e => e.key === 'Enter' && handleCreate()}
                />
                <button
                    onClick={handleCreate}
                    disabled={submitting || !newName.trim()}
                    className="bg-[#1e6091] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#164a70] disabled:opacity-50"
                >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add
                </button>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr><th className="p-4 font-semibold text-gray-600">Name</th><th className="p-4 font-semibold text-gray-600 text-right w-32">Actions</th></tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? <tr><td colSpan={2} className="p-8 text-center text-gray-500">No items found.</td></tr> :
                            items.map(item => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4">
                                        {editingId === item.id ? (
                                            <div className="flex gap-2">
                                                <input
                                                    value={editName}
                                                    onChange={e => setEditName(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded"
                                                    autoFocus
                                                    disabled={!!processingId}
                                                    onKeyDown={e => e.key === 'Enter' && handleUpdate(item.id)}
                                                />
                                                <button onClick={() => handleUpdate(item.id)} disabled={!!processingId} className="text-green-600 hover:bg-green-50 p-1 rounded">
                                                    {processingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                                </button>
                                                <button onClick={() => setEditingId(null)} disabled={!!processingId} className="text-gray-500 hover:bg-gray-100 p-1 rounded"><X className="h-4 w-4" /></button>
                                            </div>
                                        ) : (
                                            <span className="font-medium text-gray-700">{item.name}</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        {editingId !== item.id && (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => { setEditingId(item.id); setEditName(item.name); }} disabled={!!processingId} className="text-blue-600 p-1 hover:bg-blue-50 rounded disabled:opacity-50"><Pencil className="h-4 w-4" /></button>
                                                <button onClick={() => confirmDelete(item.id)} disabled={!!processingId} className="text-red-500 p-1 hover:bg-red-50 rounded disabled:opacity-50">
                                                    {processingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                isOpen={confirm.isOpen}
                onClose={() => setConfirm(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirm.action}
                title={confirm.title}
                message={confirm.message}
            />
        </div>
    );
};

const UsersTab: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'Admin' });

    const [confirm, setConfirm] = useState<ConfirmState>({ isOpen: false, id: null, title: '', message: '', action: async () => { } });

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch { toast.error("Failed to load users"); } finally { setLoading(false); }
    };

    const handleCreate = async () => {
        if (!newUser.username || !newUser.password) { toast.error("Username and password required"); return; }
        try {
            setSubmitting(true);
            await createUser(newUser);
            toast.success("User created");
            setNewUser({ username: '', password: '', role: 'Admin' });
            await fetchUsers();
        } catch (error: any) {
            if (error.response?.status === 409) toast.error("Username already exists");
            else toast.error("Failed to create user");
        } finally { setSubmitting(false); }
    };

    const confirmDelete = (id: number) => {
        setConfirm({
            isOpen: true,
            id: id.toString(),
            title: "Delete User",
            message: "Are you sure you want to delete this user?",
            action: async () => {
                try {
                    setConfirm(prev => ({ ...prev, isOpen: false }));
                    await deleteUser(id);
                    toast.success("User deleted");
                    await fetchUsers();
                } catch (error: any) {
                    toast.error(error.response?.data || "Failed to delete user");
                }
            }
        });
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-[#1e6091]" /></div>;

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                        placeholder="Username"
                        value={newUser.username}
                        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                        className="px-3 py-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        className="px-3 py-2 border rounded"
                    />
                    <select
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        className="px-3 py-2 border rounded"
                    >
                        <option value="Admin">Admin</option>
                        <option value="SuperAdmin">Super Admin</option>
                    </select>
                    <button
                        onClick={handleCreate}
                        disabled={submitting}
                        className="bg-[#1e6091] text-white px-4 py-2 rounded font-medium flex items-center justify-center gap-2 hover:bg-[#164a70]"
                    >
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create User
                    </button>
                </div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-50">
                    <tr><th className="p-4">Username</th><th className="p-4">Role</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-2"><UserIcon className="h-4 w-4 text-gray-400" />{user.username}</td>
                            <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'SuperAdmin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{user.role}</span></td>
                            <td className="p-4 text-right">
                                <button onClick={() => confirmDelete(user.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="h-4 w-4" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal
                isOpen={confirm.isOpen}
                onClose={() => setConfirm(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirm.action}
                title={confirm.title}
                message={confirm.message}
            />
        </div>
    );
};

// --- Main Page ---

const AdminSetupPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'schools' | 'colleges' | 'users'>('events');

    const tabs = [
        { id: 'events', label: 'Event Setup', icon: Calendar },
        { id: 'schools', label: 'Manage Schools', icon: SchoolIcon },
        { id: 'colleges', label: 'Manage Colleges', icon: GraduationCap },
        { id: 'users', label: 'Manage Users', icon: UserIcon },
    ] as const;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-[#1e6091] mb-8 text-center uppercase tracking-wider font-[Impact]">
                Admin Dashboard
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === tab.id
                            ? 'bg-[#1e6091] text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <tab.icon className="h-5 w-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="animate-in fade-in zoom-in-95 duration-200">
                {activeTab === 'events' && <EventTab />}
                {activeTab === 'schools' && <ListTab type="School" />}
                {activeTab === 'colleges' && <ListTab type="College" />}
                {activeTab === 'users' && <UsersTab />}
            </div>
        </div>
    );
};

export default AdminSetupPage;
