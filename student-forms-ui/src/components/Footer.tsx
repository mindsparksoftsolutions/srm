import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-[#002855] via-[#1e6091] to-[#002855] text-white py-2 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="text-sm font-medium tracking-wide flex justify-center gap-4">
                    {/* <a
                        href="https://www.agaraadhifoundation.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-200 transition-colors"
                    >
                        Agaraadhi Foundation
                    </a>
                    <span>|</span> */}
                    <a
                        href="https://vedhamsmidway.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-200 transition-colors"
                    >
                        Vedhams Midway
                    </a>
                    <span>|</span>
                    <a
                        href="https://mindsparksoftsolutions.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-200 transition-colors"
                    >
                        Mind Spark Soft Solutions
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
