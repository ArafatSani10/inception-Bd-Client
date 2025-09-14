import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from "framer-motion";

const TopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        // Fetch courses
        const courseRes = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        const coursesData = courseRes.data.data || [];

        // Fetch all users once
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const users = userRes.data.data || [];

        // Map courses with instructor info
        const coursesWithInstructor = coursesData.map(course => {
          const instructor = users.find(u => u.email === course.instructor?.email) || {};
          return {
            ...course,
            instructorName: instructor.name || 'Unknown',
            instructorImage: instructor.photo || instructor.image || 'https://randomuser.me/api/portraits/lego/1.jpg',
            category: course.category || { name: 'General' },
            rating: course.rating || 0,
            duration: course.duration || 'N/A',
            price: course.price || 0
          };
        });

        setCourses(coursesWithInstructor);
      } catch (err) {
        console.error(err);
        // setError('Failed to fetch courses or instructors.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return (
    <div className="p-6 text-center">
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    </div>
  );

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!courses.length) return <div className="p-6 text-center text-gray-500">No courses available.</div>;

  return (
    <div className="py-24 w-full relative">
      <div className="max-w-full mx-auto md:px-2 px-3">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff]">
            ✨Top Courses
          </h2>
          <p className="mt-4 text-sm md:text-xl text-gray-600 dark:text-gray-300">
            Crafted by industry pros, loved by thousands.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {courses.map(course => (
              <SwiperSlide key={course._id || course.id}>
                <Link to={`/coursedetails/${course.slug}`}>
                  <div className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover object-center rounded-t-3xl"
                      />
                      {course.category && (
                        <div className="absolute top-4 left-4 bg-[#00baff] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg hover:shadow-xl transition-all">
                          {course.category.name}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-[#00baff] line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-400 text-sm mb-5 line-clamp-2">
                        {course.description?.slice(0, 100)}...
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <img
                          src={course.instructorImage}
                          alt={course.instructorName}
                          className="w-8 h-8 rounded-full object-cover border-2 border-[#00baff]"
                        />
                        <span>
                          Instructor: <span className="font-medium">{course.instructorName}</span>
                        </span>
                      </div>

                      {/* Rating & Duration */}
                      {/* Rating & Duration */}
                      <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 py-2 rounded-lg shadow-sm">
                        <span className="flex items-center gap-1 text-yellow-400">
                          ⭐⭐⭐⭐⭐
                        </span>
                        <span className="font-medium text-[#00baff]">
                          {course.duration} Hours
                        </span>
                      </div>

                      {/* Price & Enroll */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold text-[#00baff]">
                          ৳{course.price}
                        </span>
                        <button className="bg-[#00baff] hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div
            ref={prevRef}
            className="absolute top-1/3 -translate-y-1/2 left-2 md:left-4 z-10 bg-blue-600 text-white dark:bg-gray-400 dark:text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
          >
            <FiChevronLeft size={24} />
          </div>
          <div
            ref={nextRef}
            className="absolute top-1/3 -translate-y-1/2 right-2 md:right-4 z-10 bg-blue-600 text-white dark:bg-gray-400 dark:text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
          >
            <FiChevronRight size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCourses;
