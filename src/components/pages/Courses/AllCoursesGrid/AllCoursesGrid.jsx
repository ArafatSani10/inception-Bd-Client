import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {motion} from "framer-motion"

const AllCoursesGrid = () => {
    const [courses, setCourses] = useState([]);
    const [enrollCounts, setEnrollCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
                const data = response.data.data || [];

                const coursesWithDefaults = data.map((course) => ({
                    ...course,
                    instructorName: course.instructor?.name || "Unknown",
                    instructorImage:
                        course.instructorImage || course.instructor?.image || "https://randomuser.me/api/portraits/lego/1.jpg",
                    category: course.category || { name: "General" },
                    thumbnail: course.thumbnail || "https://via.placeholder.com/400x200?text=Course+Image",
                    rating: course.rating || 4.5,
                    duration: course.duration || "N/A",
                    price: course.price || 0,
                }));

                setCourses(coursesWithDefaults);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);



    if (loading) return <div className="text-center py-20 text-lg"> <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div></div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="py-24 px-2 max-w-full mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff]">
                    🎓 Explore All Our Courses
                </h2>
                <p className="mt-4 text-sm md:text-xl text-gray-600 dark:text-gray-300">
                    Find the perfect course to power your career.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {/*  */}
                {courses.map((course) => (
                   <Link to={`/coursedetails/${course.slug}`}>
                    <div
                        key={course._id || course.id}
                        className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute top-4 left-4 bg-[#00baff] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                {course.category?.name}
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                                {course.title}
                            </h3>
                      <p className="text-gray-700 dark:text-gray-400 text-sm mb-5 line-clamp-2">{course.description?.slice(0, 100)}...</p>


                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <img
                                    src={course.instructorImage}
                                    alt={course.instructorName}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span>
                                    Instructor: <span className="font-medium">{course.instructorName}</span>
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300   py-2 rounded-lg shadow-sm">
                                <span className="flex items-center gap-1">
                                    {/* Colored stars */}
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-yellow-400">⭐</span>
                                </span>

                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {course.duration} Hours
                                </span>
                            </div>


                            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        ৳{course.price}
                                    </span>
                                </div>
                             
                                    <button className="bg-[#00baff] hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                                        Enroll Now
                                    </button>
                       
                            </div>
                        </div>
                    </div>
                   </Link>
                ))}
            </div>
        </div>
    );
};

export default AllCoursesGrid;
