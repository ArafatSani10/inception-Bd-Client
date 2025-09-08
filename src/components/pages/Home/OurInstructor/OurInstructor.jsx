import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import axios from "axios";

const OurInstructor = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const result = res?.data?.data || [];
        const instructors = result.filter((item) => item.role === "instructor");
        setInstructorData(instructors);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="py-16 max-w-full mx-auto text-center">
      <h2 className="text-xl md:text-5xl font-semibold text-[#00baff] dark:text-[#00baff]">
        🧑‍🏫 Instructors
      </h2>

      <p className="text-sm md:text-lg mt-4 text-gray-900 dark:text-white mb-12">
        #Learn from the experienced & skillful instructors
      </p>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading instructors...</p>
      ) : (
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
          className="pb-14"
        >
          {instructorData.length > 0 ? (
            instructorData.map((instructor) => (
              <SwiperSlide key={instructor._id || instructor.id}>
                <div className="bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-3xl p-5 hover:shadow-xl">
                  <img
                    src={instructor?.photo || instructor?.image || "https://via.placeholder.com/150"}
                    alt={instructor?.name}
                    className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                  />
                  <h3 className="mt-5 text-xl font-semibold text-[#00baff] dark:text-[#00baff]">
                    {instructor?.name}
                  </h3>
                  <p className="text-[#00baff] dark:text-[#00baff] text-sm font-medium mt-2">
                    {instructor?.jobTitle}
                  </p>

                  <div className="mt-3 text-yellow-400 text-lg">
                    {/* {"⭐".repeat(Math.floor(instructor?.rating || 5))} */}⭐⭐⭐⭐⭐
                  </div>

                  {/* Dynamic Profile Link using email */}
                  <button
                    onClick={() => window.location.href = `/instructor/${instructor?.email}`}
                    className="inline-block mt-6 px-5 py-2 rounded-full bg-[#00baff] hover:bg-indigo-600 text-white font-semibold shadow-md transition-all"
                  >
                    View Profile
                  </button>

                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No instructors found</p>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default OurInstructor;






