import React from 'react';
import CollegeStudentForm from '../components/CollegeStudentForm';
import { LeftRoadSafetyAnimation, RightRoadSafetyAnimation } from '../components/RoadSafetyAnimations';

const CollegeRegisterPage: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-start justify-center w-full">

            {/* Left Animation - 20% Width (1/5) */}
            <div className="hidden lg:block lg:col-span-1 h-full sticky top-28">
                <LeftRoadSafetyAnimation />
            </div>

            {/* Main Form - 60% Width (3/5) */}
            <div className="col-span-1 lg:col-span-3 w-full px-4">
                <CollegeStudentForm
                    onSuccess={() => {
                        // Optional: Navigate to list or stay on form
                        // console.log('Registered successfully');
                    }}
                    onCancel={() => { }}
                />
            </div>

            {/* Right Animation - 20% Width (1/5) */}
            <div className="hidden lg:block lg:col-span-1 h-full sticky top-28">
                <RightRoadSafetyAnimation />
            </div>

        </div>
    );
};

export default CollegeRegisterPage;
