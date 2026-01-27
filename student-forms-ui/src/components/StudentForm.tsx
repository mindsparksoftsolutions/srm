import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createStudent, updateStudent } from '../services/studentService';
import type { Student } from '../services/studentService';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { User, Users, Layers, Hash, Save, X, School } from 'lucide-react';
import { schools } from '../data/schools';

interface StudentFormProps {
    studentToEdit?: Student | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ studentToEdit, onSuccess, onCancel }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, setValue, formState } = useForm<Student>();
    const { errors } = formState;

    useEffect(() => {
        if (studentToEdit) {
            setValue('studentNameFatherInitial', studentToEdit.studentNameFatherInitial);
            setValue('gender', studentToEdit.gender);
            setValue('class', studentToEdit.class);
            setValue('section', studentToEdit.section);
            setValue('schoolNameLocation', studentToEdit.schoolNameLocation);
            setValue('emisNumber', studentToEdit.emisNumber);
        } else {
            reset();
        }
    }, [studentToEdit, setValue, reset]);

    const onSubmit = async (data: Student) => {
        try {
            // Convert EMIS number to number type for backend
            const payload: any = { ...data };
            if (payload.emisNumber) {
                // If it's a non-empty string, convert to number
                if (typeof payload.emisNumber === 'string' && payload.emisNumber.trim() !== '') {
                    payload.emisNumber = Number(payload.emisNumber);
                } else if (payload.emisNumber === '') {
                    // If empty string, set to null
                    payload.emisNumber = null;
                }
            } else {
                payload.emisNumber = null;
            }

            if (studentToEdit && studentToEdit.id) {
                await updateStudent(studentToEdit.id, payload as Student);
                toast.success(t('success'));
            } else {
                await createStudent(payload as Student);
                toast.success(t('success'));
            }

            // Retain school name after submission
            const currentSchool = data.schoolNameLocation;
            reset();
            if (currentSchool) {
                setValue('schoolNameLocation', currentSchool);
            }

            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    const inputClasses = "w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e6091] focus:border-transparent transition-all duration-200 outline-none hover:bg-white hover:shadow-sm text-sm";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-1 ml-1";

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-full mx-auto mt-2"
        >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#1e6091] to-[#2a75b3] py-3 px-4 text-white text-center">
                <h2 className="text-lg font-bold flex items-center justify-center gap-2">
                    <User className="h-5 w-5" />
                    {studentToEdit ? t('fields.update') : t('title')}
                </h2>
                <p className="text-blue-50 text-xs opacity-90">
                    {studentToEdit ? 'Update participant details below' : ''}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-5 space-y-4">

                {/* Student Name */}
                <motion.div variants={itemVariants}>
                    <label className={labelClasses}>
                        {t('fields.studentName')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#1e6091]" />
                        <input
                            {...register('studentNameFatherInitial', { required: t('validation.required') })}
                            className={inputClasses}
                            maxLength={50}
                            placeholder={t('placeholders.studentName')}
                        />
                    </div>
                    {errors.studentNameFatherInitial && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.studentNameFatherInitial.message}</span>}
                </motion.div>

                {/* Gender */}
                <motion.div variants={itemVariants}>
                    <label className={labelClasses}>
                        {t('fields.gender')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            {...register('gender', { required: t('validation.required') })}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                            <option value="">{t('placeholders.selectGender')}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                    {errors.gender && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.gender.message}</span>}
                </motion.div>

                {/* Class and Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.class')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                {...register('class', { required: t('validation.required') })}
                                className={`${inputClasses} appearance-none cursor-pointer`}
                            >
                                <option value="">{t('placeholders.selectClass')}</option>
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Others'].map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                        </div>
                        {errors.class && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.class.message}</span>}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.section')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                {...register('section', { required: t('validation.required') })}
                                className={`${inputClasses} appearance-none cursor-pointer`}
                            >
                                <option value="">{t('placeholders.selectSection')}</option>
                                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Others'].map(sec => (
                                    <option key={sec} value={sec}>{sec}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                        </div>
                        {errors.section && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.section.message}</span>}
                    </motion.div>
                </div>

                {/* School Name */}
                <motion.div variants={itemVariants}>
                    <label className={labelClasses}>
                        {t('fields.schoolName')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            {...register('schoolNameLocation', { required: t('validation.required') })}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                            <option value="">{t('placeholders.selectSchool') || 'Select School'}</option>
                            {schools.map((school, index) => (
                                <option key={index} value={school}>{school}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                    {errors.schoolNameLocation && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.schoolNameLocation.message}</span>}
                </motion.div>

                {/* EMIS Number */}
                <motion.div variants={itemVariants}>
                    <label className={labelClasses}>
                        {t('fields.emisNumber')} <span className="text-gray-400 text-xs font-normal ml-2">(Optional)</span>
                    </label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            inputMode="numeric"
                            {...register('emisNumber', {
                                onChange: (e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    e.target.value = value;
                                    setValue('emisNumber', value);
                                },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: t('validation.number')
                                }
                            })}
                            className={inputClasses}
                            maxLength={19}
                            placeholder={t('placeholders.emisNumber')}
                        />
                    </div>
                    {errors.emisNumber && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.emisNumber.message}</span>}
                </motion.div>

                {/* Honeypot Field (Hidden) */}
                <input
                    type="text"
                    {...register('website')}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                />

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-3 pt-2 border-t border-gray-100 mt-4"
                >
                    <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className={`w-full sm:w-auto min-w-[120px] flex items-center justify-center gap-2 bg-[#1e6091] text-white py-2 px-6 rounded-lg hover:bg-[#184e77] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-900/10 font-medium text-base ${formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <Save className="h-4 w-4" />
                        {formState.isSubmitting
                            ? (studentToEdit ? 'Updating...' : 'Saving...')
                            : (studentToEdit ? t('fields.update') : t('fields.submit'))
                        }
                    </button>

                    {studentToEdit && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={formState.isSubmitting}
                            className="w-full sm:w-auto min-w-[120px] flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 border border-gray-200 font-medium text-base disabled:opacity-70"
                        >
                            <X className="h-4 w-4" />
                            {t('fields.cancel')}
                        </button>
                    )}
                </motion.div>
            </form>
        </motion.div>
    );
};

export default StudentForm;
