import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogPosts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-full mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 text-[#00baff]">
        ✍️ Blog
      </h2>
      <p className="text-sm sm:text-lg text-center text-gray-500 dark:text-gray-400 mb-12">
        #Explore latest news and articles
      </p>

      {blogPosts.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="py-12"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post._id}>
              <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden transition hover:scale-100 hover:shadow-2xl">
                <div className="relative">
                  <img
                    src={post.thumbnail || post.image || "https://via.placeholder.com/400x250"}
                    alt={post.title}
                    className="w-full h-56 sm:h-60 md:h-64 object-cover"
                  />
                  <div className="absolute bottom-[-12px] left-4 bg-green-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center gap-2 shadow">
                    <FaCalendarAlt className="text-xs" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-4 pt-6">
                 
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
          
                  <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {post.description || post.des || "No description available."}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <FaUser />
                      {post.author?.name || post.author || "Unknown"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment />
                      {post.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading posts...
        </p>
      )}
    </div>
  );
};

export default BlogSection;
