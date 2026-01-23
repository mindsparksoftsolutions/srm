import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Search } from 'lucide-react';

interface SearchableSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    required?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
    label,
    error,
    icon,
    required
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Initial value handling
    useEffect(() => {
        if (!isOpen) {
            // When closing, reset search term to empty 
            // but we don't want to clear the value.
            setSearchTerm('');
        }
    }, [isOpen]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                className={`relative w-full bg-gray-50 border rounded-lg transition-all duration-200 
                  ${isOpen ? 'ring-2 ring-[#1e6091] border-transparent bg-white' : 'border-gray-200 hover:bg-white'} 
                  ${error ? 'border-red-500 focus:ring-red-200' : ''}`}
            >
                {/* Icon */}
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                        {icon}
                    </div>
                )}

                {/* Main Display / Input Trigger */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full py-2 ${icon ? 'pl-10' : 'pl-3'} pr-10 cursor-pointer min-h-[40px] flex items-center text-sm`}
                >
                    {value ? (
                        <span className="text-gray-900 truncate">{value}</span>
                    ) : (
                        <span className="text-gray-400 truncate">{placeholder}</span>
                    )}
                </div>

                {/* Clear Button (optional, if needed) */}
                {/* 
                {value && (
                    <div 
                        onClick={(e) => { e.stopPropagation(); onChange(''); }}
                        className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full cursor-pointer text-gray-400"
                    >
                        <X size={14} />
                    </div>
                )} 
                */}

                {/* Arrow Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">
                    ⚠️ {error}
                </span>
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col"
                    >
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2 sticky top-0">
                            <Search size={14} className="text-gray-400" />
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Options List */}
                        <div className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`px-4 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between
                                            ${value === option ? 'bg-blue-50 text-[#1e6091] font-medium' : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <span>{option}</span>
                                        {value === option && <Check size={14} />}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                    No results found.
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchableSelect;
