import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../../Content/Authcontext';
import PurchaseCourse from './Course/PurchaseCourse';

const UserHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      
      {/* Welcome + Dashboard Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-full mx-auto gap-10 mb-12">

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 bg-white dark:bg-transparent rounded-3xl shadow-2xl p-12 text-center md:text-left transition-colors duration-300"
        >
          <h1 className=" text-xl md:text-3xl font-bold text-[#00baff] dark:text-[#00baff] mb-4">
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

      {/* User Purchased Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-full mx-auto w-full"
      >
        <PurchaseCourse />
      </motion.div>

    </div>
  );
};

export default UserHome;
