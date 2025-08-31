import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCommentDots, FaGraduationCap } from 'react-icons/fa';
import AuthContext from '../../../Content/Authcontext';
import PurchaseCourse from './Course/PurchaseCourse';
import { Link } from 'react-router';

const UserHome = () => {
    const { user } = useContext(AuthContext);

    // Sample data (replace with backend data later)
    const coursesEnrolled = 3; // user-purchased courses
    const notifications = 5;
    const messages = 2;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">

            {/* Welcome + Dashboard Section */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-full mx-auto gap-10 mb-12">

                {/* Welcome Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center md:text-left transition-colors duration-300"
                >
                    <h1 className="text-xl md:text-3xl font-bold text-[#00baff] mb-4">
                        Welcome, {user?.displayName || 'Guest'}!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg mb-6">
                        We’re glad to have you back. Explore your dashboard and see what’s new today.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
                    >
                        View all events
                    </motion.button>
                </motion.div>

                {/* Dashboard Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex-1"
                >
                    <img
                        src="https://inceptionbd.com/store/1/dashboard.png"
                        alt="Dashboard Preview"
                        className="rounded-3xl h-[300px] shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

            </div>

            {/* User Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
                {/* Courses Enrolled */}
                <Link to="/dashboard/purchase-course">
                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors ">
                    <FaGraduationCap className="text-5xl text-purple-500" />
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Courses Enrolled</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{coursesEnrolled}</p>
                    </div>
                </div>
                </Link>

               

                {/* Messages / Comments */}
                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors">
                    <FaCommentDots className="text-5xl text-green-500" />
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Comments</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{messages}</p>
                    </div>
                </div>
            </motion.div>


            <div>
                <PurchaseCourse></PurchaseCourse>
            </div>

          
        </div>
    );
};

export default UserHome;
