import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OurInstructor from '../Home/OurInstructor/OurInstructor';
import { FaChalkboardTeacher, FaBookOpen, FaRocket, FaUsers } from 'react-icons/fa';

const InstructorPage = () => {
    return (
        <div className="relative min-h-screen w-full pt-24  pb-16 font-montserrat text-gray-800 dark:text-gray-100 overflow-hidden">
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

            <div className="relative z-10 max-w-full mx-auto">
                {/* Hero Banner */}
                <div className="relative h-[400px] w-full overflow-hidden ">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src="https://t3.ftcdn.net/jpg/09/02/72/10/360_F_902721003_hKBfU9FLfG0kwk39v7FCNGgVIEGSXTtf.jpg"
                        alt="Instructor Banner" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <p className="text-sm mb-3">
                                <Link to="/" className="hover:underline font-bold">Home</Link> <span className="mx-2">&gt;</span> <span className='font-bold'>Instructors</span>
                            </p>
                            
                        </motion.div>
                    </div>
                </div>

                {/* Our Instructors */}
                <OurInstructor />

                {/* Why Learn From Us */}
                <section className="mt-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#00baff] dark:text-[#00baff]">
                        Why Learn From Us?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaChalkboardTeacher className="text-3xl text-blue-500" />,
                                title: 'Expert Mentors',
                                desc: 'Industry professionals with years of teaching experience.',
                            },
                            {
                                icon: <FaBookOpen className="text-3xl text-green-500" />,
                                title: 'Practical Content',
                                desc: 'Hands-on projects and real-world examples.',
                            },
                            {
                                icon: <FaRocket className="text-3xl text-purple-500" />,
                                title: 'Career Boost',
                                desc: 'Courses designed to accelerate your career.',
                            },
                            {
                                icon: <FaUsers className="text-3xl text-pink-500" />,
                                title: 'Community Support',
                                desc: 'Join a strong network of learners and experts.',
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-center justify-center">{item.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Instructor Qualities */}
                <section className="mt-24">
                    <h2 className="text-2xl md:text-4xl font-bold text-center text-[#00baff] dark:text-[#00baff] mb-10">
                        Our Instructors Are Known For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
                        {[
                            "Clear Communication Skills",
                            "Updated Knowledge Base",
                            "Friendly & Supportive Teaching",
                        ].map((quality, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="p-6 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
                            >
                                <h3 className="text-xl font-semibold text-[#00baff] mb-2">{quality}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    We ensure every student feels engaged, empowered, and supported in their journey.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InstructorPage;
