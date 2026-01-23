import React, { useState } from 'react';
import CollegeStudentList from '../components/CollegeStudentList';
import CollegeStudentForm from '../components/CollegeStudentForm';
import type { CollegeStudent } from '../services/collegeStudentService';

const CollegeStudentsPage: React.FC = () => {
    // const navigate = useNavigate();
    const [studentToEdit, setStudentToEdit] = useState<CollegeStudent | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleEdit = (student: CollegeStudent) => {
        setStudentToEdit(student);
    };

    const handleSuccess = () => {
        setStudentToEdit(null);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="space-y-6">


            <CollegeStudentList onEdit={handleEdit} refreshKey={refreshKey} />

            {/* Edit Modal (Simple overlay) */}
            {studentToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setStudentToEdit(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
                        >
                            &times;
                        </button>
                        <div className="p-1">
                            <CollegeStudentForm
                                studentToEdit={studentToEdit}
                                onSuccess={handleSuccess}
                                onCancel={() => setStudentToEdit(null)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollegeStudentsPage;
