import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const tabs = ["About", "Courses", "Badges"];

const InstructorProfile = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-[#020a18]">
            <div className="max-w-full mx-auto">
                {/* Hero Section */}
                <div className="relative max-sm:hidden rounded-3xl overflow-hidden h-72 md:h-96">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 z-10"></div>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://inceptionbd.com/store/1/Python%20Live%20(3).png')",
                        }}
                    ></div>
                </div>

                {/* Content Container */}
                <div className="bg-white dark:bg-[#00091a] rounded-3xl p-3 md:p-8 mt-24 md:-mt-16 relative z-10 transition-all duration-300">
                    {/* Header */}
                    <div className="text-start">
                        <div className="flex items-center gap-5">
                            <div className="relative flex-shrink-0">
                                <img
                                    src="https://inceptionbd.com/store/1/1686419740636.jpg"
                                    alt="Md Ridoy Hossain"
                                    className="w-28 h-28 md:w-44 md:h-44 rounded-full object-cover border-4 border-white transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-col">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    Md Ridoy Hossain
                                </h1>
                                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                                    Robotics Engineer & AI Specialist
                                </p>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-8">
                        {[
                            { count: 157, label: "Followers" },
                            { count: 0, label: "Following" },
                            { count: 1, label: "Courses" },
                            { count: 5, label: "Reviews" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="text-center p-4 bg-gradient-to-br from-indigo-50 to-white dark:from-[#00091a] dark:to-[#000c22] rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{item.count}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex border-b border-gray-200 dark:border-gray-700 min-w-max">
                            {tabs.map((tab, i) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(i)}
                                    className={`px-5 py-3 font-medium text-sm md:text-base relative whitespace-nowrap transition-colors duration-300 ${activeTab === i
                                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                        }`}
                                >
                                    {tab}
                                    {activeTab === i && (
                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="py-4 text-gray-700 dark:text-gray-300">
                        {activeTab === 0 && (
                            <div className="space-y-6">
                                <p className="leading-relaxed text-lg">
                                    I am Ridoy, a passionate technologist. My love for technology, particularly AI, Robotics, and IoT, fuels my ambition to become a robotics engineer and establish a robotics industry in Bangladesh. My goal is to empower Bangladeshi Youth with access to robotics education, fostering innovation and future-ready skills.

                                    I had the honor of receiving the Asia Pacific ICT Alliance (APICTA) Merit Award 2020-2021, often regarded as the "Oscar of ICT in Asia," for my contributions to the tech community. Over the years, I have worked on various innovative projects, including the Automatic House Cleaner and Life Safety Robot, IoT-Based Fire Fighter Robot, Robotics Wheelchair, and the AI Humanoid Robot Mr.71. These projects have brought me not only recognition but also the opportunity to explore the potential of technology to make a difference in people's lives.

                                    My professional journey has taken me to leading electronics manufacturing companies, such as itel, VIVO, Samsung, and Xiaomi, where I gained invaluable experience in cutting-edge industrial technologies like Industrial Robotics Hands.

                                    I also actively contribute to organizations like Robotics School, Puraton Bakhorba Science Club, and JhPI Robotics Club, where I mentor and inspire young minds to pursue their passion for science and technology.

                                    Awards & Achievements:
                                    My dedication to technology and innovation has been recognized through numerous prestigious awards:
                                    👉 APICTA Merit Award 2020-2021
                                    👉 BASIS National ICT Award 2020
                                    👉 Innovated and Engineer 2019 – Top 3 in Bangladesh
                                    👉 ESSAB Innovation Search 2019 – Top 10 in Bangladesh

                                    And multiple wins at National Science and Technology Weeks and Skills Competitions across several years.

                                    With every step, I strive to bring my vision of a technologically advanced Bangladesh closer to reality. I am committed to using my skills and experience to create a positive impact, inspiring others to dream big and innovate for a better tomorrow.
                                </p>

                                <p className="leading-relaxed">
                                    I received the <span className="font-semibold text-indigo-600 dark:text-indigo-400">Asia Pacific ICT Alliance (APICTA) Merit Award 2020-2021</span>,
                                    often called the "Oscar of ICT in Asia," for my contributions to the tech community.
                                </p>

                                <div className="group bg-white dark:bg-[#00091a] p-5 rounded-2xl border border-indigo-100 dark:border-[#1a1f2e] transition-all duration-300">
                                    <div className=" dark:from-transparent dark:to-transparent p-1 rounded-2xl">
                                        <h3 className="font-bold text-xl mb-3 text-indigo-800 dark:text-blue-200">
                                            Awards & Achievements
                                        </h3>
                                        <ul className="space-y-2 text-gray-800 dark:text-gray-300">
                                            {[
                                                "APICTA Merit Award 2020-2021",
                                                "BASIS National ICT Award 2020",
                                                "Innovation and Engineering 2019 – Top 3 in Bangladesh",
                                            ].map((award, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-600 dark:text-green-400 mr-2 mt-1">✓</span>
                                                    <span>{award}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>



                                <div>
                                    <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Skills & Expertise</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {["Robotics Engineering", "Artificial Intelligence", "IoT Development", "Python Programming"].map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="space-y-6">
                                <div className="rounded-2xl p-6 
                  bg-gradient-to-r from-indigo-50 to-white 
                  dark:from-transparent dark:to-transparent 
                  border border-indigo-100 dark:border-[#1e2a40] transition-all duration-300">
                                    <div className="flex flex-col md:flex-row gap-6">

                                        {/* Thumbnail Placeholder */}
                                        <div className="flex-shrink-0">
                                            <div className="bg-gray-200  border-2 border-dashed rounded-xl w-32 h-32" />
                                        </div>

                                        {/* Course Info */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                                                Basics of Robotics and AI
                                            </h3>
                                            <p className="mb-4 text-gray-700 dark:text-gray-300">
                                                This comprehensive course teaches the fundamentals of robotics and artificial intelligence.
                                            </p>

                                            {/* CTA Button */}
                                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-5 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                                                Enroll Now - $49.99
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}

                        {activeTab === 2 && (
                            <div className="space-y-6">
                                <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Achievement Badges</h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    {["APICTA Winner", "Innovator", "Top Trainer", "Community Leader"].map((badge, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl p-4 text-center transition-all duration-300 hover:scale-[1.03]
                   bg-gradient-to-br from-gray-100 to-white 
           dark:from-transparent dark:to-transparent dark:border dark:border-[#2b3248]"
                                        >
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3
                        bg-white dark:bg-[#1f2937] shadow-inner">
                                                <span className="text-2xl">🏆</span>
                                            </div>
                                            <div className="font-semibold text-gray-700 dark:text-gray-200">{badge}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;