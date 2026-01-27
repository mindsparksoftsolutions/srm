import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = 'danger',
    isLoading = false
}) => {
    if (!isOpen) return null;

    const getColors = () => {
        switch (variant) {
            case 'danger': return { bg: 'bg-red-50', border: 'border-red-100', icon: 'text-red-500', btn: 'bg-red-600 hover:bg-red-700' };
            case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-100', icon: 'text-yellow-500', btn: 'bg-yellow-600 hover:bg-yellow-700' };
            case 'info': return { bg: 'bg-blue-50', border: 'border-blue-100', icon: 'text-blue-500', btn: 'bg-blue-600 hover:bg-blue-700' };
        }
    };

    const colors = getColors();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative"
                    >
                        <div className={`p-6 border-b ${colors.bg} ${colors.border} flex gap-4`}>
                            <div className={`p-3 rounded-full bg-white shadow-sm h-12 w-12 flex items-center justify-center shrink-0`}>
                                <AlertTriangle className={`h-6 w-6 ${colors.icon}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{message}</p>
                            </div>
                            <button onClick={onClose} disabled={isLoading} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 ${colors.btn} disabled:opacity-50`}
                            >
                                {isLoading && <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
