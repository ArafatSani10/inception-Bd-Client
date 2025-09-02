import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);

        console.log('API response:', response.data);

        // Make sure courses is always an array
        setCourses(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="p-6 text-center">⏳ Loading courses...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  if (!courses.length)
    return <div className="p-6 text-center text-gray-500">No courses available.</div>;

  return (
    <div className="py-24 w-full">
      <div className="max-w-full mx-auto md:px-2 px-3">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff]">
            ✨Top Courses of our course
          </h2>
          <p className="mt-4 text-sm md:text-xl text-gray-600 dark:text-gray-300">
            Crafted by industry pros, loved by thousands.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          className="pb-12"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
        >
          {courses.map((course) => (
            <SwiperSlide key={course._id || course.id}>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover object-center rounded-t-3xl"
                  />
                  {course.category && (
                    <div className="absolute top-4 left-4 bg-[#00baff] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {course.category?.name}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  {course.instructor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <img
                        src={ course.instructorImage}
                        alt={course.instructor.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>
                        Instructor:{' '}
                        <span className="font-medium">{course.instructor.name}</span>
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                    <span>
                      ⭐ {course.rating || 0} (
                      {course.students ? Math.floor(course.students / 1000) + 'k+' : '0'} students)
                    </span>
                    <span>{course.duration || 'N/A'}</span>
                  </div>

                  {/* Price & Enroll */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${course.price || 0}
                      </span>
                      {course.price > 80 && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${course.price + 30}
                        </span>
                      )}
                    </div>
                    <Link to={`/coursedetails/${course.slug}`}>
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
    </div>
  );
};

export default TopCourses;
