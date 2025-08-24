import React from "react";
import BlogSection from "../Home/Blogsection/BlogSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div className="min-h-screen w-full relative pt-20 text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-hidden font-montserrat">

      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundColor: "#f9fafb",
          backgroundImage: `
            radial-gradient(60% 40% at 80% 20%, rgba(0, 186, 255, 0.2), transparent 70%),
            radial-gradient(40% 30% at 10% 90%, rgba(0, 186, 255, 0.15), transparent 80%)
          `,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 dark:block hidden"
        style={{
          backgroundColor: "#00091a",
          backgroundImage: `
            radial-gradient(60% 40% at 80% 20%, rgba(0, 186, 255, 0.1), transparent 70%),
            radial-gradient(40% 30% at 10% 90%, rgba(0, 186, 255, 0.08), transparent 80%)
          `,
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "screen",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-full mx-auto">

        {/* Hero Banner */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://www.shutterstock.com/image-photo/young-woman-working-on-computer-600nw-1711024264.jpg"
            alt="Blog Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <div className="text-sm font-medium mb-4 flex items-center justify-center text-white">
                <Link to="/" className="hover:underline font-semibold">Home</Link>
                <span className="mx-2">&gt;</span>
                <span className="font-semibold">Blog</span>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Featured Article */}




        {/* Blog Cards Section */}
        <BlogSection />
      </div>
    </div>
  );
};

export default BlogPage;
