import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";

const modulesData = [
    { title: "Live Class", topics: 35, expanded: true },
    { title: "Recorded Classes", topics: 35, expanded: false },
    { title: "Resources", topics: 1, expanded: false },
];

const ModulePage = () => {
    const [modules, setModules] = useState(modulesData);
    const [selectedTopic, setSelectedTopic] = useState({ module: 0, topic: 0 });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // Resize Handler
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleModule = (index) => {
        setModules((prev) =>
            prev.map((mod, i) => (i === index ? { ...mod, expanded: !mod.expanded } : mod))
        );
    };

    return (
        <div className="min-h-screen font-montserrat flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Topbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
                <div className="flex items-center   gap-10">
                    <img
                        src="https://inceptionbd.com/store/1/Untitled%20design%20(3).png"
                        alt="Logo"
                        className="h-10"
                    />
                    <div className="">
                        <h1 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                            Master Generative AI in Bangla
                        </h1>
                      
                    </div>
                </div>
                <div className="flex gap-4 text-gray-600 dark:text-gray-300">
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                            Course Page
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                            My Courses
                        </button>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className=""
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-end gap-6 px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
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
                <div
                    className={`flex-1 p-6 transition-all ${isSidebarOpen && !isMobile ? "lg:w-3/4" : "w-full"
                        }`}
                >
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Course Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>

                {/* Sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            key="sidebar"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="absolute right-0 top-0 h-full w-3/4 lg:w-1/4 bg-white dark:bg-gray-800 shadow-lg z-20"
                        >
                            <div className="p-4 border-b dark:border-gray-700">
                                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    Course Modules
                                </h2>
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
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
                                                                className={`p-2 rounded-md cursor-pointer text-sm ${selectedTopic.module === idx &&
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
