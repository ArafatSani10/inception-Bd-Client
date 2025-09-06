import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const modulesData = [
  { title: "Live Class", topics: 5, expanded: true },
  { title: "Recorded Classes", topics: 5, expanded: false },
  { title: "Resources", topics: 2, expanded: false },
];

const ModulePage = () => {
  const [modules, setModules] = useState(modulesData);
  const [selectedTopic, setSelectedTopic] = useState({ module: 0, topic: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleModule = (index) => {
    setModules((prev) =>
      prev.map((mod, i) =>
        i === index ? { ...mod, expanded: !mod.expanded } : mod
      )
    );
  };

  return (
    <div className=" font-montserrat bg-gray-50 dark:bg-[#00091a] flex flex-col transition-colors duration-300">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#00091a] shadow">
        <div className="flex items-center gap-4">
          
          <h1 className="font-semibold text-gray-800 dark:text-gray-200">
            Master Generative AI in Bangla
          </h1>
        </div>

        <div className="flex items-center gap-4">
         
        <Link to="/student-dashboard/purchase-course">
 
          <button  className="hidden md:block px-4 py-2 bg-gray-200 dark:bg-[#00baff] dark:text-white text-gray-800 rounded-lg hover:bg-gray-300 transition">
            My Courses
          </button>
        </Link>

          {/* Toggle button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-end gap-6 px-6 py-3 bg-white dark:bg-[#00091a] border-b dark:border-gray-700">
        <button className="text-green-600 font-semibold border-b-2 border-green-600">
          Content
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-green-600">
          Certificates
        </button>
      </div>

      {/* Main */}
      <div className="flex flex-1 relative">
        {/* Video Area */}
        <motion.div
          className="p-6 transition-all duration-500"
          animate={{
            width: isSidebarOpen ? "75%" : "100%", // বড় স্ক্রিনে video এর width adjust হবে
          }}
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/wpO8UbYmNj8?si=G9-2gSCmBEcXm7Xr"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute md:static right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col overflow-hidden z-20 w-3/4 md:w-1/4"
            >
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Course Modules
                </h2>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {modules.map((module, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleModule(idx)}
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {module.title} ({module.topics} Topics)
                      </h3>
                      {module.expanded ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </div>

                    <AnimatePresence>
                      {module.expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pl-3 border-l-2 border-green-500"
                        >
                          <ul className="space-y-2">
                            {[...Array(module.topics)].map((_, i) => (
                              <li
                                key={i}
                                onClick={() =>
                                  setSelectedTopic({ module: idx, topic: i })
                                }
                                className={`p-2 rounded-md cursor-pointer text-sm ${
                                  selectedTopic.module === idx &&
                                  selectedTopic.topic === i
                                    ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-600"
                                }`}
                              >
                                Topic {i + 1}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModulePage;
