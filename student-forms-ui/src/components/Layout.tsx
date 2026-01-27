import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import { Toaster } from 'sonner';
import Footer from './Footer';

import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    const isAdmin = !!token;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            {/* Admin Navigation Bar */}
            {isAdmin && (
                <div className="bg-gray-800 text-white py-2 px-4 shadow-md">
                    <div className="max-w-7xl mx-auto flex justify-end gap-6 text-sm font-medium">
                        <Link to="/students" className="hover:text-blue-300 transition-colors">School Students</Link>
                        <Link to="/college-students" className="hover:text-blue-300 transition-colors">College Students</Link>
                        {localStorage.getItem('role') === 'SuperAdmin' && (
                            <Link to="/admin/events" className="hover:text-blue-300 transition-colors flex items-center gap-1">
                                <span>📅</span> Event Setup
                            </Link>
                        )}
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }}
                            className="text-red-300 hover:text-red-100 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}

            <Toaster position="top-right" richColors />
            <main className="flex-grow w-full  mx-auto py-0 px-2">
                {children}
            </main>

            {/* Tamil Text Banner */}
            <div className="w-full bg-white py-2 text-center border-t border-gray-200">
                <p className="text-[#002855] font-bold text-sm md:text-base">
                    தமிழ்நாடு அரசு போக்குவரத்துத் துறை | வட்டாரப் போக்குவரத்து அலுவலகங்கள் | திருப்பத்தூர் மற்றும் வாணியம்பாடி
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default Layout;
