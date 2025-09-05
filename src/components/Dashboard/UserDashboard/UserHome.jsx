import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCommentDots, FaGraduationCap } from 'react-icons/fa';
import AuthContext from '../../../Content/Authcontext';
import PurchaseCourse from './Course/PurchaseCourse';
import { Link } from 'react-router-dom'; // fixed: should be react-router-dom
import Lottie from 'lottie-react';

import lottiedata from '../../../../public/lottie/Artificial intelligence robot development technology.json';

const UserHome = () => {
    const { user } = useContext(AuthContext);

    // Sample data (replace with backend later)
    const coursesEnrolled = 3;
    const notifications = 5;
    const messages = 2;

    return (
        <div className=" bg-gray-50 dark:bg-[#00091a] transition-colors duration-300 p-1 md:p-5">

            {/* Welcome + Dashboard Section */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-full mx-auto gap-10 mb-16">

                {/* Welcome Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl 
             p-6 sm:p-8 md:p-10 text-center md:text-left relative overflow-hidden"
                >
                    {/* Decorative Gradient Background (only visible lightly) */}
                    <div className="absolute inset-0  rounded-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl text-start font-extrabold 
                   text-[#00baff] mb-3 sm:mb-4 leading-snug">
                            Welcome, {user?.displayName || "Guest"}!
                        </h1>
                        <p className="text-gray-600 text-start dark:text-gray-300 text-sm sm:text-base md:text-lg mb-6 
                  max-w-lg  md:mx-0">
                            We’re glad to have you back. Explore your dashboard and see what’s new today.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl 
                 bg-gradient-to-r from-purple-600 to-pink-500 
                 text-white font-semibold shadow-lg hover:shadow-xl 
                 hover:opacity-95 transition-all items-start justify-start flex duration-300"
                        >
                            View all events
                        </motion.button>
                    </div>
                </motion.div>


                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex-1 flex items-center justify-center"
                >
                    <Lottie animationData={lottiedata} loop={true} className="w-80 md:w-96" />
                </motion.div>
            </div>

            {/* User Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16"
            >
                {/* Courses Enrolled */}
                <Link to="/dashboard/purchase-course">
                    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all">
                        <FaGraduationCap className="text-5xl text-purple-500" />
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Courses Enrolled</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{coursesEnrolled}</p>
                        </div>
                    </div>
                </Link>

                {/* Notifications */}
                <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    <FaBell className="text-5xl text-yellow-500" />
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Notifications</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{notifications}</p>
                    </div>
                </div>

                {/* Messages / Comments */}
                <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    <FaCommentDots className="text-5xl text-green-500" />
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Comments</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{messages}</p>
                    </div>
                </div>
            </motion.div>

            {/* Purchased Courses Section */}
            <div className="max-w-full mx-auto">
                <PurchaseCourse />
            </div>
        </div>
    );
};

export default UserHome;
