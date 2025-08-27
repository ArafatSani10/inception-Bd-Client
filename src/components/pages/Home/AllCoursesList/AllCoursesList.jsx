import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllCoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/courses");
        const data = res.data.data || [];

        // Map for instructorImage fallback
        const mappedCourses = data.map(course => ({
          ...course,
          instructorImage: course.instructorImage || course.instructor?.image || "https://randomuser.me/api/portraits/lego/1.jpg",
          instructorName: course.instructor?.name || "Unknown",
          category: course.category?.title || "General",
        }));

        setCourses(mappedCourses);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="py-24 max-w-full mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff]">
          🎓Explore All Our Courses
        </h2>
        <p className="mt-4 text-sm md:text-xl text-gray-600 dark:text-gray-300">
          Find the perfect course to power your career.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {courses.map(course => (
          <SwiperSlide key={course._id}>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover object-center rounded-t-3xl" />
                <div className="absolute top-4 left-4 bg-[#00baff] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {course.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">{course.title}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <img src={course.instructorImage} alt={course.instructorName} className="w-6 h-6 rounded-full object-cover" />
                  <span>Instructor: <span className="font-medium">{course.instructorName}</span></span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                  <span>⭐ {course.rating} ({Math.floor(course.students / 1000)}k+ students)</span>
                  <span>{course.duration} hours</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">৳{course.price}</span>
                    {course.price > 80 && (
                      <span className="ml-2 text-sm text-gray-400 line-through">৳{course.price + 30}</span>
                    )}
                  </div>
                  <Link to='/coursedetails'>
                    <button className="bg-[#00baff] hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AllCoursesList;
