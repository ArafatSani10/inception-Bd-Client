import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const colors = [
  "#3EC6F0",
  "#F15C5C",
  "#26C178",
  "#FF7D50",
  "#A276F5",
  "#7963F3",
  "#FFD166",
  "#06D6A0",
  "#EF476F",
  "#118AB2",
];

const CourseCategory = ({ categories: categoriesData, courses: coursesData }) => {
  const [categories, setCategories] = useState(categoriesData);
  const [courses, setCourses] = useState(coursesData);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const data = courses?.map((cat, index) => {
          // count calculation
          const count = courses.filter((course) => {
            if (typeof course.category === "string") {
              return course.category.toLowerCase() === cat.name.toLowerCase();
            }
            if (
              typeof course.category === "object" &&
              course.category !== null
            ) {
              return (
                course.category.name?.toLowerCase() === cat.name.toLowerCase()
              );
            }
            if (Array.isArray(course.category)) {
              return course.category.some(
                (c) =>
                  (typeof c === "string" ? c : c.name)?.toLowerCase() ===
                  cat.name.toLowerCase()
              );
            }
            return false;
          }).length;

          return {
            _id: cat._id,
            title: cat.name,
            slug: cat.slug,
            count,
            color: colors[index % colors.length],
            icon: cat.icon,
          };
        });

        setCategories(data);
      } catch (err) {
        console.error(err);
        // toast.error("Failed to load categories or courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-12 px-4 dark:bg-[#00091a] transition-colors duration-500">
      <h1 className="text-2xl md:text-5xl font-semibold text-[#00baff] text-center mb-10 animate-fade-in">
        🎓 Trending Categories
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat?._id}>
            <div className="flex flex-col items-center">
              <div
                onClick={() =>
                  (window.location.href = `/courses/category/${cat?.title}`)
                }
                className="rounded-2xl h-60 w-72 flex-shrink-0 p-6 flex flex-col items-center justify-center cursor-pointer transform transition duration-500 hover:scale-105 shadow-2xl"
                style={{ backgroundColor: cat?.color }}
              >
                <img
                  src={cat?.icon}
                  alt={cat?.title}
                  className="h-28 w-28 mb-4 filter drop-shadow-lg transition-transform duration-500 hover:scale-110"
                  draggable={false}
                />
                <div className="bg-white dark:bg-gray-800 mt-4 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full shadow-md text-sm select-none">
                  {cat?.count} {cat?.count === 1 ? "Course" : "Courses"}
                </div>
                <p className="text-center font-semibold text-white drop-shadow-sm select-none mt-5">
                  {cat?.title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseCategory;
