import React, { useEffect, useState } from 'react';

import { getCollegeCount } from '../services/collegeStudentService';
import type { CollegeStudent } from '../services/collegeStudentService';


interface CollegeStudentListProps {
    onEdit: (student: CollegeStudent) => void;
    refreshKey: number;
}

const CollegeStudentList: React.FC<CollegeStudentListProps> = ({ refreshKey }) => {
    // const { t } = useTranslation();
    const [counts, setCounts] = useState<{ college: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, [refreshKey]);

    const loadData = async () => {
        try {
            setLoading(true);
            const countsData = await getCollegeCount();
            setCounts(countsData);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch summary');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="space-y-6 mt-8">
            {/* College Wise Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">College-wise Registration Summary</h3>
                    <div className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200">
                        Total Registered: {counts.reduce((sum, item) => sum + item.count, 0)}
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading summary...</div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : counts.length > 0 ? (
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                            <tr>
                                <th className="p-4 w-16">S.No</th>
                                <th className="p-4">College Name & Location</th>
                                <th className="p-4 text-center w-32">Count</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {counts.map(({ college, count }, index) => (
                                <tr key={college} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium">{index + 1}</td>
                                    <td className="p-4 font-medium text-gray-900">{college}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center justify-center bg-[#1e6091] text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {count}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-gray-500">No registrations found.</div>
                )}
            </div>

            {/* Student List Hidden as per request */}
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden"> ... </div> */}
        </div>
    );
};

export default CollegeStudentList;
