import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "/images/default-avatar.png";

export default function RecentUpdates() {
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, blogRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/courses`),
          axios.get(`${import.meta.env.VITE_API_URL}/blogs`),
        ]);

        setCourses((courseRes.data?.data || []).reverse());
        setBlogs((blogRes.data?.data || []).reverse());
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-32 h-32 bg-blue-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Recent Updates
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Track the latest courses and blogs on our platform
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses */}
          <InfoCard
            title="Recent Courses"
            subtitle={`Total: ${courses.length} • Pending: ${
              courses.filter((c) => (c.status || "pending") === "pending").length
            }`}
            data={courses.slice(0, 3).map((c) => ({
              title: c.title,
              author: c.instructorTitle || "Unknown",
              authorImage: c.instructorImage || defaultAvatar,
              status: (c.status || "pending").toLowerCase(),
              time: new Date(c.createdAt).toLocaleDateString(),
              courseImage: c.thumbnail || defaultAvatar,
            }))}
            accentColor="bg-gradient-to-r from-blue-500 to-cyan-400"
            onViewAll={() => navigate("/courses")}
          />

          {/* Blogs */}
          <InfoCard
            title="Recent Blogs"
            subtitle={`Total: ${blogs.length} • Pending: ${
              blogs.filter(
                (b) => (b.status || "pending").toLowerCase() === "pending"
              ).length
            }`}
            data={blogs.slice(0, 3).map((b) => ({
              title: b.title,
              author: b.author?.name || "Unknown",
              status: (b.status || "pending").toLowerCase(),
              time: new Date(b.createdAt).toLocaleDateString(),
              courseImage: b.thumbnail || defaultAvatar, // blog thumbnail
            }))}
            accentColor="bg-gradient-to-r from-purple-500 to-pink-500"
            onViewAll={() => navigate("/blog")}
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, subtitle, data, accentColor, onViewAll }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className={`${accentColor} text-white p-6`}>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-blue-100 mt-2">{subtitle}</p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-300 flex gap-4 group"
            style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both` }}
          >
            {item.courseImage && (
              <div className="relative flex-shrink-0">
                <img
                  src={item.courseImage}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                />
                {item.authorImage && (
                  <img
                    src={item.authorImage}
                    alt={item.author}
                    className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                  />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                {item.title}
              </h3>

              <div className="flex items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
                {!item.authorImage && (
                  <span className="truncate">{item.author}</span>
                )}
                <span className="mx-2">•</span>
                <span
                  className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {item.status}
                </span>
                <span className="mx-2">•</span>
                <span className="whitespace-nowrap">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <button
          onClick={onViewAll}
          className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:underline transition-all duration-300 flex items-center justify-end group/view-all"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 group-hover/view-all:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
