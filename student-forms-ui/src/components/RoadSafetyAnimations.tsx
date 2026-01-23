import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, ShieldCheck, Smartphone, Ban } from 'lucide-react';

export const LeftRoadSafetyAnimation: React.FC = () => {
    return (
        <div className="hidden lg:flex flex-col items-center justify-center h-full w-full p-1 overflow-hidden relative">
            <h3 className="text-[#1e6091] font-bold text-xl mb-8 uppercase tracking-wider text-center" style={{ fontFamily: 'Impact, sans-serif' }}>
                Ride Smart
            </h3>

            {/* Road Container */}
            <div className="relative w-full h-[350px] flex items-center justify-center bg-gray-200 rounded-xl overflow-hidden border-4 border-gray-300 shadow-inner perspective-1000">
                {/* Road Asphalts & Markings */}
                <div className="absolute inset-0 bg-gray-200 flex flex-col items-center">
                    {/* Moving Road Lines - Center Line */}
                    <div className="absolute inset-0 flex flex-col items-center gap-16 opacity-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                className="w-4 h-16 bg-white border border-gray-100 rounded-sm shadow-sm"
                                animate={{ y: [0, 150] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.6,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Moving Vehicle (Bike) */}
                <motion.div
                    className="relative z-10"
                    animate={{
                        x: [-2, 2, -2], // Slight weaving/balancing
                        rotate: [-2, 2, -2] // Leaning
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                >
                    {/* Bike Body */}
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-xl relative ring-2 ring-white/50">
                        <Bike className="h-12 w-12 text-white" />

                        {/* Speed Lines */}
                        <motion.div
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/10 blur-md rounded-full"
                            animate={{ scaleX: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                        />
                    </div>

                    {/* Headlight Beam */}
                    <motion.div
                        className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-32 bg-gradient-to-t from-yellow-200/40 to-transparent blur-md"
                        animate={{ opacity: [0.4, 0.6, 0.4], height: ["8rem", "10rem", "8rem"] }}
                        transition={{ repeat: Infinity, duration: 0.2 }}
                    />
                </motion.div>

                {/* Passing Objects (Trees/Greenery) */}
                <motion.div
                    className="absolute left-1 w-8 h-8 bg-green-500/20 rounded-full blur-sm"
                    initial={{ y: -100, x: -20, opacity: 0 }}
                    animate={{ y: 500, x: -40, opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
                />
                <motion.div
                    className="absolute right-1 w-8 h-8 bg-green-500/20 rounded-full blur-sm"
                    initial={{ y: -100, x: 20, opacity: 0 }}
                    animate={{ y: 500, x: 40, opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear", delay: 0.8 }}
                />
            </div>

            <motion.div
                className="mt-6 flex items-center gap-2 text-blue-700 font-bold bg-blue-50 px-5 py-2 rounded-full border border-blue-200 shadow-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ShieldCheck className="h-5 w-5" />
                <span>Wear Helmet, Ride Safe</span>
            </motion.div>
        </div>
    );
};

export const RightRoadSafetyAnimation: React.FC = () => {
    const [lightColor, setLightColor] = useState<'red' | 'yellow' | 'green'>('red');

    useEffect(() => {
        const cycleLights = () => {
            setLightColor('green');
            setTimeout(() => {
                setLightColor('yellow');
                setTimeout(() => {
                    setLightColor('red');
                    setTimeout(() => cycleLights(), 1000); // Slower cycle
                }, 1000);
            }, 1000);
        };

        cycleLights();
    }, []);

    return (
        <div className="hidden lg:flex flex-col items-center justify-center h-full w-full p-1 overflow-hidden">
            <h3 className="text-[#1e6091] font-bold text-xl mb-8 uppercase tracking-wider text-center" style={{ fontFamily: 'Impact, sans-serif' }}>
                Respect Rules
            </h3>

            <div className="relative">
                {/* Traffic Light Container */}
                <div className="bg-gray-900 p-4 rounded-3xl shadow-xl border-2 border-gray-700 flex flex-col gap-4 relative z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-gray-800 rounded-b-lg" />

                    {/* Red Light */}
                    <motion.div
                        className={`w-14 h-14 rounded-full border-[3px] border-gray-950 ${lightColor === 'red' ? 'bg-red-600 shadow-[0_0_40px_rgba(220,38,38,0.8)]' : 'bg-red-950/30'}`}
                        animate={lightColor === 'red' ? { scale: [1, 1.05, 1] } : {}}
                    />

                    {/* Yellow Light */}
                    <motion.div
                        className={`w-14 h-14 rounded-full border-[3px] border-gray-950 ${lightColor === 'yellow' ? 'bg-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.8)]' : 'bg-yellow-950/30'}`}
                        animate={lightColor === 'yellow' ? { scale: [1, 1.05, 1] } : {}}
                    />

                    {/* Green Light */}
                    <motion.div
                        className={`w-14 h-14 rounded-full border-[3px] border-gray-950 ${lightColor === 'green' ? 'bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.8)]' : 'bg-green-950/30'}`}
                        animate={lightColor === 'green' ? { scale: [1, 1.05, 1] } : {}}
                    />
                </div>

                {/* Post */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-24 bg-gray-700 -z-10 rounded-b-full"></div>
            </div>

            {/* No Mobile Warning */}
            <motion.div
                className="mt-8 flex items-center gap-3 text-red-600 font-bold bg-red-50 px-5 py-2 rounded-full border border-red-200 shadow-sm"
                animate={{
                    y: [0, -5, 0],
                    borderColor: ['#fecaca', '#ef4444', '#fecaca']
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="relative">
                    <Smartphone className="h-5 w-5" />
                    <Ban className="absolute -top-1 -right-1 h-4 w-4 text-red-600 bg-white rounded-full opacity-90" />
                </div>
                <span>No Mobile While Riding</span>
            </motion.div>
        </div>
    );
};

const RoadSafetyAnimations: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 h-full">
            <LeftRoadSafetyAnimation />
            <div className="h-px bg-gray-200 w-full lg:hidden block"></div>
            <RightRoadSafetyAnimation />
        </div>
    );
};

export default RoadSafetyAnimations;
