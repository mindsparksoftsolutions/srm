import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createCollegeStudent, updateCollegeStudent } from '../services/collegeStudentService';
import type { CollegeStudent } from '../services/collegeStudentService';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { User, Users, Layers, Hash, Save, X, School, Phone, Mail } from 'lucide-react';
import { departments } from '../data/departments';
import SearchableSelect from './SearchableSelect';

interface CollegeStudentFormProps {
    studentToEdit?: CollegeStudent | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const CollegeStudentForm: React.FC<CollegeStudentFormProps> = ({ studentToEdit, onSuccess, onCancel }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, setValue, formState, watch, control } = useForm<CollegeStudent & { customDepartment?: string; customCollege?: string }>();
    const { errors } = formState;

    const selectedDepartment = watch('department');
    const selectedCollege = watch('collegeNameLocation');

    const [collegeList, setCollegeList] = React.useState<string[]>([]);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const { getColleges } = await import('../services/collegeListService');
                const data = await getColleges();
                const names = data.map(c => c.name);
                // Ensure 'Others' is at the end if it exists, or add it?
                // The seed data has 'Others'.
                setCollegeList(names);
            } catch (error) {
                console.error("Failed to fetch colleges", error);
            }
        };
        fetchColleges();
    }, []);

    useEffect(() => {
        if (studentToEdit) {
            setValue('studentName', studentToEdit.studentName);
            setValue('gender', studentToEdit.gender);
            setValue('mobileNumber', studentToEdit.mobileNumber);
            setValue('email', studentToEdit.email);
            setValue('registerNumber', studentToEdit.registerNumber);
            setValue('yearOfStudy', studentToEdit.yearOfStudy);

            // Handle Department
            if (departments.includes(studentToEdit.department)) {
                setValue('department', studentToEdit.department);
            } else {
                setValue('department', 'Others');
                setValue('customDepartment', studentToEdit.department);
            }

            // Handle College
            // Need to wait for collegeList? Or just check if it's in the list?
            // Since collegeList loads async, we might need to handle this carefully.
            // For now, let's assume if it's not "Others" and we have data, it matches.
            // But checking against 'colleges' (static) was synchronous.
            // We'll update this logic to check against the loaded list or just set it.
            // However, the SearchableSelect options need to be populated.

            // Allow setting value even if list is loading, SearchableSelect handles value.
            // But distinction between "In List" vs "Others" requires knowing the list.
            // Hack for now: We won't strictly validate against the list here for "Others" check 
            // until list is loaded, or we just trust the value.
            // Better: Check if value is "Others". 
            // If studentToEdit.collegeNameLocation is NOT in the fetched list (once fetched), then it's custom??
            // Re-evaluating: 'Others' is a specific value in the list.

            setValue('collegeNameLocation', studentToEdit.collegeNameLocation);

            // Logic for Custom College detection needs refinement with dynamic list.
            // For now, let's defer setting specific "Others" logic until we have the list, 
            // OR we rely on the saved data implies it.
            // Actually, if we saved it as a Custom College, we probably saved the custom name in the DB column.
            // If that name is NOT in our dropdown list, how do we show it?
            // The current logic:
            // if (colleges.includes(val)) set val else set 'Others' & custom = val

            // We can't do this synchronously easily.
            // Let's modify this effect to run when collegeList changes OR studentToEdit changes.
        } else {
            reset();
        }
    }, [studentToEdit, setValue, reset]);

    // logic to handle "Others" detection properly with async list
    useEffect(() => {
        if (studentToEdit && collegeList.length > 0) {
            const val = studentToEdit.collegeNameLocation;
            if (collegeList.includes(val)) {
                setValue('collegeNameLocation', val);
            } else {
                setValue('collegeNameLocation', 'Others');
                setValue('customCollege', val);
            }
        }
    }, [collegeList, studentToEdit, setValue]);

    const onSubmit = async (data: CollegeStudent & { customDepartment?: string; customCollege?: string }) => {
        try {
            // Merge custom fields
            if (data.department === 'Others' && data.customDepartment) {
                data.department = data.customDepartment;
            }
            if (data.collegeNameLocation === 'Others' && data.customCollege) {
                data.collegeNameLocation = data.customCollege;
            }

            // Clean up temporary fields before sending
            const payload: CollegeStudent = {
                studentName: data.studentName,
                gender: data.gender,
                department: data.department,
                mobileNumber: data.mobileNumber,
                email: data.email,
                collegeNameLocation: data.collegeNameLocation,
                registerNumber: data.registerNumber,
                yearOfStudy: data.yearOfStudy
            };

            if (studentToEdit && studentToEdit.id) {
                await updateCollegeStudent(studentToEdit.id, payload);
                toast.success(t('success'));
            } else {
                await createCollegeStudent(payload);
                toast.success(t('success'));
            }

            // Capture fields to retain
            // Only retain if NOT in edit mode (entry mode)
            if (!studentToEdit) {
                const retainedCollege = data.collegeNameLocation === 'Others' ? 'Others' : data.collegeNameLocation;
                const retainedDepartment = data.department === 'Others' ? 'Others' : data.department;
                const retainedCustomCollege = data.collegeNameLocation === 'Others' ? data.customCollege : '';
                const retainedCustomDepartment = data.department === 'Others' ? data.customDepartment : '';

                reset({
                    studentName: '',
                    gender: '',
                    mobileNumber: '',
                    email: '',
                    registerNumber: '',
                    yearOfStudy: '',
                    collegeNameLocation: retainedCollege,
                    department: retainedDepartment,
                    customCollege: retainedCustomCollege,
                    customDepartment: retainedCustomDepartment
                });
            } else {
                reset();
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
            initial="visible"
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

            </div>

            <motion.form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-5 space-y-4">

                {/* Student Name and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.studentName')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#1e6091]" />
                            <input
                                {...register('studentName', { required: t('validation.required') })}
                                className={inputClasses}
                                maxLength={50}
                                placeholder={t('placeholders.studentName')}
                            />
                        </div>
                        {errors.studentName && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.studentName.message}</span>}
                    </motion.div>

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
                </div>

                {/* Mobile and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.mobileNumber')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                {...register('mobileNumber', {
                                    required: t('validation.required'),
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: t('validation.digits10')
                                    }
                                })}
                                className={inputClasses}
                                maxLength={10}
                                placeholder="Enter Mobile Number"
                            />
                        </div>
                        {errors.mobileNumber && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.mobileNumber.message}</span>}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.email')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                {...register('email', {
                                    required: t('validation.required'),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: t('validation.email')
                                    }
                                })}
                                className={inputClasses}
                                placeholder={t('fields.email')}
                            />
                        </div>
                        {errors.email && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.email.message}</span>}
                    </motion.div>
                </div>

                {/* College Name */}
                <motion.div variants={itemVariants}>
                    <div className="relative">
                        <Controller
                            name="collegeNameLocation"
                            control={control}
                            render={({ field }) => (
                                <SearchableSelect
                                    options={collegeList}
                                    value={field.value}
                                    onChange={field.onChange}
                                    label={String(t('fields.collegeName'))}
                                    placeholder="Select College"
                                    required
                                    error={errors.collegeNameLocation?.message}
                                    icon={<School className="h-4 w-4" />}
                                />
                            )}
                            rules={{ required: t('validation.required') }}
                        />
                    </div>

                    {/* Custom College Input */}
                    {selectedCollege === 'Others' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2"
                        >
                            <input
                                {...register('customCollege', { required: t('validation.required') })}
                                className={inputClasses}
                                placeholder={t('placeholders.enterCollege')}
                            />
                            {errors.customCollege && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.customCollege.message}</span>}
                        </motion.div>
                    )}
                </motion.div>

                {/* Department and Year of Study */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                        <div className="relative">
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <SearchableSelect
                                        options={departments}
                                        value={field.value}
                                        onChange={field.onChange}
                                        label={String(t('fields.department'))}
                                        placeholder="Select Department"
                                        required
                                        error={errors.department?.message}
                                        icon={<Layers className="h-4 w-4" />}
                                    />
                                )}
                                rules={{ required: t('validation.required') }}
                            />
                        </div>

                        {/* Custom Department Input */}
                        {selectedDepartment === 'Others' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2"
                            >
                                <input
                                    {...register('customDepartment', { required: t('validation.required') })}
                                    className={inputClasses}
                                    placeholder={t('placeholders.enterDepartment')}
                                />
                                {errors.customDepartment && <span className="text-red-500 text-xs mt-0.5 ml-1 flex items-center gap-1">⚠️ {errors.customDepartment.message}</span>}
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.yearOfStudy')}
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                {...register('yearOfStudy')}
                                className={`${inputClasses} appearance-none cursor-pointer`}
                            >
                                <option value="">Select Year</option>
                                <option value="I Year">I Year</option>
                                <option value="II Year">II Year</option>
                                <option value="III Year">III Year</option>
                                <option value="IV Year">IV Year</option>
                                <option value="V Year">V Year</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                        </div>
                    </motion.div>
                </div>

                {/* Register Number and Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                            {t('fields.registerNumber')}
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                {...register('registerNumber')}
                                className={inputClasses}
                                maxLength={15}
                                placeholder="Enter Register Number"
                            />
                        </div>
                    </motion.div>

                    {/* Honeypot Field (Hidden) */}
                    <input
                        type="text"
                        {...register('website')}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <motion.div
                        variants={itemVariants}
                        className="flex gap-3 md:col-span-2"
                    >
                        <button
                            type="submit"
                            disabled={formState.isSubmitting}
                            className={`flex-1 flex items-center justify-center gap-2 bg-[#1e6091] text-white py-2 px-6 rounded-lg hover:bg-[#184e77] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-900/10 font-medium text-base ${formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 border border-gray-200 font-medium text-base disabled:opacity-70"
                            >
                                <X className="h-4 w-4" />
                                {t('fields.cancel')}
                            </button>
                        )}
                    </motion.div>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default CollegeStudentForm;
