import React from "react";
import { motion } from "framer-motion";

const PurchaseCourse = () => {
    const purchases = [
        {
            _id: "2025",
            title: "The Complete Python Course in English",
            price: "Free",
            rating: 5.0,
            instructor: "Boktiar Ahmed Bappy",
            category: "Programming",
            date: "31 Aug 2025",
            thumbnail: "https://i.ibb.co/svMq9gM/python-course.jpg",
        },
        {
            _id: "2026",
            title: "Master Object-oriented programming (OOP) in Python (English)",
            price: "Free",
            rating: 5.0,
            instructor: "Boktiar Ahmed Bappy",
            category: "Programming",
            date: "31 Aug 2025",
            thumbnail: "https://i.ibb.co/x3m0gCh/python-oop.jpg",
        },
        {
            _id: "2024",
            title: "Python Live for Beginners in Bangla",
            price: "Free",
            rating: 4.29,
            instructor: "Md Ridoy Hossain",
            category: "Programming",
            date: "31 Aug 2025",
            thumbnail: "https://i.ibb.co/6tK6jSh/python-live.jpg",
        },
    ];

    return (
        <div className="max-w-full mx-auto mt-12 p-2">
            <h2 className="text-2xl font-bold mb-8 text-[#00baff]">
                You have 3 new course
            </h2>

            {purchases.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    You haven’t purchased any course yet.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {purchases.map((course, index) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.03 }}
                            className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
                        >
                            {/* Thumbnail */}
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover md:h-56"
                            />

                            {/* Content */}
                            <div className="p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg md:text-xl">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Category: {course.category}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Instructor: {course.instructor}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-yellow-400 font-bold">
                                            {course.rating} ★
                                        </span>
                                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded">
                                            {course.price}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Item ID: {course._id} | Purchase Date: {course.date}
                                    </p>
                                </div>

                                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all duration-300">
                                    View Course
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PurchaseCourse;
