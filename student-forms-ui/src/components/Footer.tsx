import { motion } from 'framer-motion';
import React from 'react';

const Footer: React.FC = () => {
    // Red -> Yellow -> Green cycle
    const trafficColors = ["#ef4444", "#eab308", "#22c55e", "#ef4444"];

    return (
        <footer className="w-full bg-gradient-to-r from-[#002855] via-[#1e6091] to-[#002855] text-white py-2 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-sm font-medium tracking-wide flex justify-center gap-2 items-center"
                >
                    <motion.a
                        href="https://vedhamsmidway.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold inline-block"
                        animate={{ color: trafficColors }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        whileHover={{ scale: 1.1 }}
                    >
                        Vedhams Midway
                    </motion.a>

                    <span className="text-gray-400 opacity-50">|</span>

                    <motion.a
                        href="https://mindsparksoftsolutions.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold inline-block"
                        animate={{ color: trafficColors }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} // Staggered
                        whileHover={{ scale: 1.1 }}
                    >
                        Mind Spark Soft Solutions
                    </motion.a>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
