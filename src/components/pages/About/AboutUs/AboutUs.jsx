import React from "react";
import {
  FaBolt,
  FaPython,
  FaRobot,
  FaTools,
  FaArrowRight,
  FaCogs,
  FaMicrochip,
  FaPersonBooth,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetMyDataQuery } from "../../../../redux/api/userApi";
import { FaLaptopCode, FaBrain, FaChartLine, } from 'react-icons/fa';
import { LiaRobotSolid } from "react-icons/lia";

const AboutUs = () => {
  const { data: myDateRes, isLoading } = useGetMyDataQuery();
  const myData = myDateRes?.data;
  console.log("my data", myData);
  const courses = [
    {
      id: 1,
      // Icon changed from FaPython to a more general programming icon
      icon: <FaLaptopCode className="text-4xl" />,
      title: "Programming",
      description: "Building Strong Foundations in Programming",
      colorClass: "bg-[#00baff]", // single solid color applied here
    },
    {
      id: 2,
      // Icon changed from FaRobot to a more symbolic AI/Brain icon
      icon: <FaBrain className="text-4xl" />,
      title: "Generative AI",
      description: "From Ideas to Intelligence: Generative AI in Action",
      colorClass: "bg-[#00baff]",
    },
    {
      id: 3,
      // Icon changed from FaMicrochip to a Data Science/Analytics icon
      icon: <FaChartLine className="text-4xl" />,
      title: "Data Science", // Corrected title casing
      description: "Discover Insights, Drive Innovation with Data Science", // Updated description to be relevant to Data Science
      colorClass: "bg-[#00baff]",
    },
    {
      id: 4,
      // Icon changed from FaCogs to a more comprehensive Full Stack/Branching icon
      icon: <FaRobot className="text-4xl" />,
      title: "Robotics with AI",
      description: "Robotics and AI: Powering the Future of Automation", // Updated description to be relevant to Full Stack
      colorClass: "bg-[#00baff]",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#00091a] text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=3000&q=80"
          alt="About Us Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="text-sm font-medium mb-4 flex items-center justify-center text-white">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>About Us</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="py-20 px-4">
        <div className="max-w-full mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#00baff]">
              🧠Our{" "}
              <span className="text-[#00baff] dark:text-[#00baff]">
                Learning Paths
              </span>
            </h2>
            <p className="max-w-5xl mx-auto text-gray-600 dark:text-gray-400">
              Specialized programs designed to bridge the gap between academic
              knowledge and industry demands
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-full mx-auto">
          {courses.map(({ id, icon, title, description, colorClass }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: id * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white border-gray-300 dark:bg-transparent rounded-xl p-4 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border  dark:border-gray-700 group-hover:-translate-y-2">
                <div
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${colorClass} text-white`}
                >
                  {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1 mt-4 flex-grow">
                  {description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-base-200 dark:bg-[#00091a]">
        <div className="max-w-full mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            <motion.div
              className="md:w-1/2 h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                <img
                  src="https://i.ibb.co/zh6d5LWy/522421764-2469019190164501-2376572341800225675-n.jpg"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 h-full flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-[#00baff]">
                Our{" "}
                <span className="text-[#00baff] dark:text-[#00baff]">
                  Mission
                </span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                At Inception BD, we're revolutionizing technical education by
                combining industry expertise with project-based learning.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We believe in empowering students with practical skills that
                translate directly to real-world challenges. Our curriculum is
                constantly updated to reflect the latest industry trends and
                technologies.
              </p>
              <div className="space-y-3">
                {[
                  "Industry-experienced instructors",
                  "Project-driven curriculum",
                  "Cutting-edge learning resources",
                  "Career support and mentorship",
                  "Flexible learning schedules",
                  "Hands-on real-world projects",
                  // "Hands-on real-world projects",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
