


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // note: react-router-dom use হবে
import axios from "axios";
import './Banner.css'

import video from "../../../../public/demovideo/snapsave-app_1793955564433189_hd.mp4"
import { AnimatePresence, motion } from "framer-motion";
import LoadingModal from "../../hooks/LoadingModal";

const Banner = () => {
  const [latestCourse, setLatestCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [instructorData, setInstructorData] = useState(null);


  useEffect(() => {
    const fetchInstructor = async () => {
      if (!latestCourse?.instructor?.email) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const allUsers = res?.data?.data || [];
        const instructor = allUsers.find(u => u.email === latestCourse.instructor.email);
        setInstructorData(instructor);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInstructor();
  }, [latestCourse]); // latestCourse dependency



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);

        const courses = res.data.data || [];

        // createdAt field থাকলে sort করে latest নাও
        const sorted = [...courses].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestCourse(sorted[0]); // সর্বশেষ course
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  if (!latestCourse) {
    return <p className="text-center text-gray-600">
      <LoadingModal></LoadingModal>
    </p>;
  }

  return (
    <div className="py-16 md:py-24 p-5 max-w-full mx-auto">
      <div className="w-full max-w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-block bg-[#b4bdef] dark:bg-[#00baff] px-4 py-2 rounded-full">
              <span className="text-white font-medium">
                Unlock Your Potential
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Master <span className="text-[#00baff]">In-Demand Skills</span> with Expert-Led Courses
            </h1>

            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Join thousands of students mastering new skills with our interactive courses. Learn from industry experts at your own pace, anytime, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/courses">
                <button className="px-8 py-4 bg-[#00baff] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105">
                  Explore Courses
                </button>
              </Link>
              <div className="">
                {/* Button */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-medium rounded-lg shadow hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Watch Demo
                  </div>
                </button>

                {/* Modal */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="fixed inset-0  flex items-center justify-center z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Modal Content */}
                      <motion.div
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl relative w-[100%] max-w-4xl overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Close Button */}
                        <button
                          onClick={() => setIsOpen(false)}
                          className="absolute  right-3  dark:text-gray-300 hover:text-red-500 transition"
                        >
                          ✕
                        </button>

                        {/* Video */}
                        <div className="aspect-video w-full h-full">
                          <iframe className="w-full h-full md:w-[900px] md:h-[500px]"
                            src="https://www.youtube.com/embed/PrBMuQxyUEc"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
  gyroscope; picture-in-picture" allowfullscreen>
                          </iframe>

                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right content */}

          <div className="lg:w-1/2 relative mt-10 lg:mt-0">

            <Link to={`/coursedetails/${latestCourse.slug}`}> <div className="relative max-w-2xl mx-auto w-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-3 w-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl max-sm:text-xs text-[#00baff] font-bold">
                      {latestCourse.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                    </div>
                  </div>
                  <div className="bg-indigo-500 dark:bg-[#00baff] text-white md:px-3 px-6 max-sm:text-xs  py-1 rounded-full text-sm font-medium">
                    TrendingCourse
                  </div>
                </div>

                <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <img
                    src={latestCourse.thumbnail || "https://via.placeholder.com/600x400"}
                    alt={latestCourse.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-between items-center">
                  {/* Instructor */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-3 items-center">
                      <img
                        src={instructorData?.photo || "https://via.placeholder.com/150"}
                        alt={instructorData?.name || "Instructor"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#00baff] shadow-md"
                      />
                      <h3 className="mt-1 text-sm font-semibold text-[#00baff] dark:text-[#00baff] text-center">
                         {instructorData?.name || "Unknown"}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#00baff]">
                      ৳{latestCourse.price || "Free"}
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#00baff] rounded-full animate-float1"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#00baff] rounded-full animate-float2"></div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-[#00baff] rounded-full animate-float3"></div>

            </div></Link>


          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
