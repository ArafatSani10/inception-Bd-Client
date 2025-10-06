import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
    FaCode,
    FaPalette,
    FaChartLine,
    FaMusic,
    FaCamera,
    FaGlobe,
    FaBusinessTime,
    FaBook,
    FaStar,
    FaUsers,
    FaClock
} from "react-icons/fa";

const iconMap = {
    programming: FaCode,
    design: FaPalette,
    marketing: FaChartLine,
    music: FaMusic,
    photography: FaCamera,
    language: FaGlobe,
    business: FaBusinessTime,
    default: FaBook
};

const CategoryCourses = () => {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [enrollCounts, setEnrollCounts] = useState({});
    const [loading, setLoading] = useState(true);

    const IconComponent = iconMap[id.toLowerCase()] || FaBook;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
                const filtered = res.data.data.filter(course => {
                    if (typeof course.category === "string") {
                        return course.category.toLowerCase().trim() === id.toLowerCase().trim();
                    }
                    if (typeof course.category === "object" && course.category !== null) {
                        return course.category.name?.toLowerCase().trim() === id.toLowerCase().trim();
                    }
                    if (Array.isArray(course.category)) {
                        return course.category.some(cat =>
                            (typeof cat === "string" ? cat : cat.name)?.toLowerCase().trim() === id.toLowerCase().trim()
                        );
                    }
                    return false;
                });

                setCourses(filtered);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchEnrollments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
                const allOrders = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data.data)
                        ? res.data.data
                        : Array.isArray(res.data.orders)
                            ? res.data.orders
                            : [];

                const counts = {};
                allOrders.forEach(order => {
                    if (!order.course) return;
                    let courseId = order.course;
                    if (typeof courseId === "object" && courseId._id) courseId = courseId._id;
                    courseId = String(courseId);

                    if (order.status === "complete") {
                        counts[courseId] = (counts[courseId] || 0) + 1;
                    }
                });

                setEnrollCounts(counts);
                console.log("Enroll Counts:", counts);
            } catch (err) {
                console.error("Failed to fetch enrollments", err);
            }
        };

        setLoading(true);
        Promise.all([fetchCourses(), fetchEnrollments()]).finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#00091a]">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-[#00baff] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <IconComponent className="text-[#00baff] text-3xl" />
                    </div>
                </div>
                <p className="text-gray-900 dark:text-white text-lg mt-6 font-light">Loading {id} courses...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-white dark:bg-[#00091a] px-6 py-12 relative overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-[#00baff]/10 to-[#3EC6F0]/10"
                    style={{
                        width: Math.floor(Math.random() * 200) + 100 + 'px',
                        height: Math.floor(Math.random() * 200) + 100 + 'px',
                        top: Math.floor(Math.random() * 100) + '%',
                        left: Math.floor(Math.random() * 100) + '%',
                        animation: `float${i % 3 + 1} 12s infinite ease-in-out`
                    }}
                ></div>
            ))}

            <div className="max-w-full mt-12 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#00baff] to-[#3EC6F0] mb-6 shadow-lg">
                        <IconComponent className="text-white text-4xl" />
                    </div>
                    <h1 className="text-xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00baff] to-[#3EC6F0] mb-4">
                        {id} Courses
                    </h1>
                    <p className="text-gray-900 dark:text-gray-300 max-w-2xl mx-auto">
                        Explore our curated collection of {id.toLowerCase()} courses designed to take your skills to the next level
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gray-200 dark:bg-gray-800 mb-6">
                            <FaBook className="text-4xl text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-2">No courses available</h3>
                        <p className="text-gray-700 dark:text-gray-500 max-w-md mx-auto">
                            There are no courses in the {id} category yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <Link to={`/coursedetails/${course.slug}`}>

                                <div key={course._id} className="group bg-gray-100 dark:bg-gray-900 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 hover:border-[#00baff]/30 transition-all duration-500 hover:-translate-y-2">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full  transform transition duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">

                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-[#00baff] text-white p-2 rounded-lg">
                                                <IconComponent className="text-lg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[#00baff] text-sm font-medium bg-[#00baff]/10 px-3 py-1 rounded-full">
                                                {course.category?.name}
                                            </span>
                                            <span className="font-bold text-gray-900 dark:text-gray-200 text-xl">
                                                {course.price === 0 ? "Free" : `৳${course.price}`}
                                            </span>

                                        </div>
                                        <h3 className="text-lg font-bold text-[#00baff] dark:text-[#00baff] mb-3 line-clamp-2">{course.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-400 text-sm mb-5 line-clamp-2">{course.description?.slice(0, 100)}...</p>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <img
                                                src={course?.instructor?.photo}
                                                alt={course?.instructor?.instructorName}
                                                className="w-8 h-8 rounded-full object-cover border-2 border-[#00baff]"
                                            />
                                            <span>
                                                Instructor:{" "}
                                                <span className="font-medium">
                                                    {course?.instructor?.name}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex mt-3 items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                                          

                                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300   px-4 py-2 rounded-lg shadow-sm">
                                                {/* Stars */}
                                                <div className="flex items-center">
                                                    <FaStar className="text-yellow-400 mr-1" />
                                                    <FaStar className="text-yellow-400 mr-1" />
                                                    <FaStar className="text-yellow-400 mr-1" />
                                                    <FaStar className="text-yellow-400 mr-1" />
                                                    <FaStar className="text-yellow-400" />
                                                </div>


                                            </div>

                                              <div className="flex items-center"><FaClock className="mr-1" /> <span>{course.duration || '10h'} Hours</span> </div>

                                        </div>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <Link to={`/coursedetails/${course.slug}`}>
                                            <button className="w-full py-3 bg-gradient-to-r from-[#00baff] to-[#3EC6F0] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#00baff]/30">
                                                See Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) translateX(0) rotate(0deg);} 50%{transform:translateY(-20px) translateX(10px) rotate(5deg);} }
        @keyframes float2 { 0%,100%{transform:translateY(0) translateX(0) rotate(0deg);} 50%{transform:translateY(15px) translateX(-15px) rotate(-5deg);} }
        @keyframes float3 { 0%,100%{transform:translateY(0) translateX(0) scale(1);} 50%{transform:translateY(-10px) translateX(-10px) scale(1.05);} }
      `}</style>
        </div>
    );
};

export default CategoryCourses;
