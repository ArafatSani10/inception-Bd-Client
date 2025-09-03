import React from "react";
import TopCourses from "../Home/TopCourses/TopCourses";
import AllCoursesList from "../Home/AllCoursesList/AllCoursesList";
import { motion } from "framer-motion";
import { Link } from "react-router";
import AllCoursesGrid from "./AllCoursesGrid/AllCoursesGrid";
import { useGetMyDataQuery } from "../../../redux/api/userApi";

const Courses = () => {
  const { data: myDateRes, isLoading } = useGetMyDataQuery();
  const myData = myDateRes?.data;
  console.log("my data", myData);
  return (
    <div className="min-h-screen w-full relative pt-20 text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-hidden">
      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundColor: "#f9fafb",
          backgroundImage: `
            radial-gradient(
              60% 40% at 80% 20%,
              rgba(100, 160, 255, 0.2),
              transparent 70%
            ),
            radial-gradient(
              40% 30% at 10% 90%,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 dark:block hidden"
        style={{
          backgroundColor: "#00091a",

          backgroundBlendMode: "screen",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Content */}
      <div className="relative z-10 max-w-full mx-auto">
        {/* Hero Banner */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src="https://img.freepik.com/free-photo/college-girls-studying-together_23-2149038414.jpg?semt=ais_hybrid&w=740&q=80"
            alt="About Us Banner"
            className="absolute inset-0 w-full h-full object-center object-cover"
          />

          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <div className="text-sm font-medium mb-4 flex items-center justify-center text-white">
                <Link to="/" className="hover:underline font-semibold">
                  Home
                </Link>
                <span className="mx-2">&gt;</span>
                <span className="font-semibold">Courses</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Top Courses */}
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TopCourses />
        </motion.div>

        {/* All Courses */}
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AllCoursesGrid></AllCoursesGrid>
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div
          className="mt-8 mb-12 text-center p-8 rounded-3xl
             
             dark:bg-[#00091a] dark:from-transparent dark:to-transparent
             transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-5xl max-sm:text-2xl font-extrabold mb-4
                 text-[#00baff] dark:text-[#00baff">
            Ready to Elevate Your Career?
          </h2>
          <p className="mb-6 text-gray-700 text-lg max-sm:text-sm dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from our latest courses designed by industry leaders. Build your portfolio, boost your skills, and unlock new opportunities.
          </p>
          <button className="px-10 py-4 max-sm:text-sm
                     bg-[#00baff]
                     text-white rounded-2xl shadow-lg
                     hover:scale-[1.05] transition-transform duration-300 font-semibold">
            Explore All Programs
          </button>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Courses;
