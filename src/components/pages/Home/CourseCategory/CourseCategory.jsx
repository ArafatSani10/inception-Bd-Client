import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const categories = [
    {
        title: "Machine Learning (ML)",
        count: 0,
        color: "#3EC6F0",
        icon: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
    },
    {
        title: "Electrical and Electronics",
        count: 2,
        color: "#F15C5C",
        icon: "https://inceptionbd.com/store/1/EEE1.png",
    },
    {
        title: "Internet of Things (IoT)",
        count: 0,
        color: "#26C178",
        icon: "https://inceptionbd.com/store/1/IoT_1.png",
    },
    {
        title: "Artificial intelligence (AI)",
        count: 1,
        color: "#FF7D50",
        icon: "https://inceptionbd.com/store/1/Machine%20Learning%201.png",
    },
    {
        title: "Programming",
        count: 3,
        color: "#A276F5",
        icon: "https://inceptionbd.com/store/1/Your%20paragraph%20text%20(1).png",
    },
    {
        title: "Robotics",
        count: 0,
        color: "#7963F3",
        icon: "https://inceptionbd.com/store/1/Your%20paragraph%20text.png",
    },
];

const CourseCategory = () => {
    return (
        <div className="py-12 px-3  dark:bg-[#00091a] transition-colors duration-500">
            <div className="text-center mb-10">
                <h1 className="text-2xl md:text-5xl font-semibold text-[#00baff] dark:text-[#00baff] transition-colors duration-500">
                    🎓Trending Categories
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm md:text-lg transition-colors duration-500">
                    #Browse trending & popular learning topics
                </p>
            </div>

            <Swiper
                slidesPerView={1.2}
                spaceBetween={20}
                breakpoints={{
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 5 },
                }}
                pagination={{ clickable: true }}
                className="pb-12"
                modules={[Pagination]}
            >
                {categories.map((cat, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="rounded-xl h-72 p-6 flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 shadow-lg dark:shadow-black/50"
                            style={{ backgroundColor: cat.color }}
                        >
                            <img
                                src={cat.icon}
                                alt={cat.title}
                                className="h-28 w-28 mb-4 filter drop-shadow-md"
                                draggable={false}
                            />
                            <div className="bg-white dark:bg-gray-800 mt-4 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full shadow-md text-sm  select-none">
                                {cat.count} {cat.count === 1 ? "Course" : "Courses"}
                            </div>
                            <p className="text-center font-semibold text-white drop-shadow-sm select-none mt-5">
                                {cat.title}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom pagination styles */}
            <style>{`
        /* Pagination bullets */
        .swiper-pagination-bullet {
          background: #999;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #fff;
          opacity: 1;
        }
        /* Dark mode pagination bullets */
        @media (prefers-color-scheme: dark) {
          .swiper-pagination-bullet {
            background: #555;
            opacity: 0.7;
          }
          .swiper-pagination-bullet-active {
            background: #ddd;
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default CourseCategory;
