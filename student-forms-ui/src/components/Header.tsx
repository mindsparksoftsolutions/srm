import React from 'react';
import { useLocation } from 'react-router-dom';
import rtoLogo from '../assets/rto-logo.png';

const Header: React.FC = () => {
    const location = useLocation();
    const isCollege = location.pathname.includes('college');

    const eventDetails = isCollege ? {
        date: "23rd Jan 2026 at 9.30 am",
        venue: "Marudhar Kesari Jain College for Women, Vaniyambadi"
    } : {
        date: "22nd Jan 2026 at 9.30 am",
        venue: "Brindhavan Matriculation Higher Secondary School, Natrampalli"
    };

    return (
        <>
            <div className="w-full bg-gradient-to-r from-blue-200 via-yellow-200 to-green-200 h-auto md:h-28 py-3 md:py-0 flex flex-wrap md:flex-nowrap items-center justify-between md:justify-center px-4 md:px-0 gap-y-2 md:gap-10 shadow-sm">
                {/* Left Logo: TN Govt */}
                <div className="flex-shrink-0 order-1 md:order-none">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/TamilNadu_Logo.svg/300px-TamilNadu_Logo.svg.png"
                        alt="TN Govt Logo"
                        className="h-16 md:h-24 w-auto object-contain drop-shadow-sm"
                    />
                </div>

                {/* Center Text */}
                <div className="flex flex-col items-center justify-center text-center order-3 md:order-none w-full md:w-auto mt-2 md:mt-0">
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <span className="text-xl md:text-3xl">🚦</span>
                        <h1 className="text-xl md:text-3xl font-extrabold text-[#1e6091] tracking-tight uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                            100K SAFE ROAD MISSION
                        </h1>
                        <span className="text-xl md:text-3xl">🚦</span>
                    </div>
                    <h2 className="text-sm md:text-xl font-bold text-[#1e6091] mt-1 tracking-wider uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                        IN 90 DAYS
                    </h2>

                </div>

                {/* Right Logo: RTO / AIFMVD */}
                <div className="flex-shrink-0 order-2 md:order-none">
                    <img
                        src={rtoLogo}
                        alt="RTO AIFMVD Logo"
                        className="h-14 md:h-20 w-auto object-contain drop-shadow-sm"
                    />
                </div>
            </div>

            {/* Navigation Links - Hidden */}
            {/* <div className="w-full bg-[#f8f9fa] border-b border-gray-200 py-2">
                <div className="max-w-7xl mx-auto flex justify-center gap-6">
                    <a href="/" className="text-[#1e6091] font-bold hover:underline">School Students</a>
                    <a href="/college-register" className="text-[#1e6091] font-bold hover:underline">College Students</a>
                </div>
            </div> */}

            {/* Event Info Bar */}
            <div className="w-full bg-gradient-to-r from-[#002855] via-[#1e6091] to-[#002855] text-white py-1 px-4 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-sm md:text-base font-medium">
                    <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>Date: {eventDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-center">
                        <span>📍</span>
                        <span>Venue: {eventDetails.venue}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
