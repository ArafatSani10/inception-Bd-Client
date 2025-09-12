import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaClock, FaPlay, FaExclamationTriangle } from "react-icons/fa";

const CourseContent = ({ course, isEnrolled }) => {
    const navigate = useNavigate();

    if (!course?.modules?.length) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No modules available for this course.
            </p>
        );
    }

    const handleModuleClick = () => {
        if (!isEnrolled) return; // Do nothing if not enrolled
        navigate(`/student-dashboard/module-page/${course.id}`);
    };

    return (
        <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a1128] dark:to-[#00091a] font-montserrat p-4 md:p-2">
            <div className="max-w-full mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-[#00baff] mb-4">
                    {course.title}
                </h1>

                {/* Warning if not enrolled */}
                {!isEnrolled && (
                    <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded-lg p-4 mb-6">
                        <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 mr-3" size={20} />
                        <span className="text-red-800 dark:text-red-800 font-medium">
                            Please enroll in the course to access the modules.
                        </span>
                    </div>
                )}

                {course.modules.map((mod, idx) => (
                    <div
                        key={mod._id || idx}
                        onClick={handleModuleClick}
                        className={`rounded-xl shadow-lg overflow-hidden border border-transparent hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800 cursor-pointer transition-all duration-300 p-6 flex justify-between items-center ${!isEnrolled ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <FaPlay className="text-gray-400" size={20} />
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
                                    {mod.topic}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                    <FaClock className="mr-1" size={12} /> {mod.contents?.length} Lessons
                                </p>
                            </div>
                        </div>
                        <FaChevronRight className="text-gray-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseContent;
