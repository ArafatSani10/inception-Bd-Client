import React from 'react';
import { FaCalendarAlt, FaUser, FaComment } from 'react-icons/fa';
import { Link } from 'react-router';

const blogPosts = [
  {
    title: "Electrical Engineering & Automation Pioneers of Technology",
    des: 'Automation, Arduino programming, PLC, MATLAB, and electrical engineering are transforming industries by driving efficiency, innovation, and sustainability. ...',
    date: "27 Jan 2025",
    author: "Dabasish Kumar Biswas",
    comments: 1,
    image: "https://inceptionbd.com/store/1946/WhatsApp%20Image%202025-01-26%20at%2023.13.48_053c4dde.jpg",
  },
  {
    title: "The Importance of Artificial Intelligence and Generative AI for the Future",
    des: 'Artificial Intelligence (AI) has transitioned from being a futuristic concept to a transformative technology, influencing almost every aspect of our lives. ...',
    date: "26 Jan 2025",
    author: "Boktiar Ahmed Bappy",
    comments: 0,
    image: "https://inceptionbd.com/store/1233/ai-background-artificial-intelligence-hand-vector-46752147.jpg",
  },
  {
    title: "Why You Need to Learn Python in 2025",
    des: 'Python continues to dominate the programming world, with over 70% of developers ranking it among the top languages, and its relevance in 2025 is stronger than ...',
    date: "26 Jan 2025",
    author: "Md Ridoy Hossain",
    comments: 7,
    image: "https://inceptionbd.com/store/1048/Untitled%20design%20(10).png",
  },
];

const BlogSection = () => {
  return (
    <div className="max-w-full mx-auto px-2  py-12">
      <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-center mb-2 text-[#00baff] ">
        ✍️Blog
      </h2>
      <p className="text-sm sm:text-lg text-center text-gray-500 dark:text-gray-400 mb-8">
        #Explore latest news and articles
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 shadow-md rounded-2xl overflow-hidden "
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 sm:h-60 md:h-64 object-cover"
              />
              <div className="absolute bottom-[-16px] left-4 bg-green-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center gap-2 shadow">
                <FaCalendarAlt className="text-xs" />
                {post.date}
              </div>
            </div>
            <div className="p-4 pt-6">
           <Link to='/blogdetails'>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {post.title}
              </h3>
           </Link>
              <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {post.des}
              </p>
              <div className="flex items-center justify-between mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 sm:gap-2">
                  <FaUser />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <FaComment />
                  {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
