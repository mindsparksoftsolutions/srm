import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import { Toaster } from 'sonner';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
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
