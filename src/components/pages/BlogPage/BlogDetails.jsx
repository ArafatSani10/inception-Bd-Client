import React from 'react';
import { motion } from "framer-motion"
import { Link } from 'react-router';
import { FaShare } from 'react-icons/fa';
const BlogDetails = () => {
    return (
        <div>
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
            <div className="relative z-10 "></div>

            {/* Hero Banner */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-2xl">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-[#2F0743] opacity-90 z-10" />
                <div className="absolute inset-0 bg-noise z-0 opacity-10" /> {/* optional static noise or texture */}

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
                    <h1 className="text-white font-extrabold text-2xl md:text-5xl leading-tight drop-shadow-lg animate-fade-in">
                        Why You Need to Learn <span className="text-yellow-300">Python</span> in 2025
                    </h1>

                    <div className="mt-4 text-sm md:text-base text-gray-200 flex items-center gap-2 flex-wrap animate-fade-in delay-100">
                        <span>Created by</span>
                        <span className="underline  decoration-yellow-400 text-white font-semibold">
                            Md Ridoy Hossain
                        </span>
                        <span className="text-gray-300">· 26 Jan 2025</span>
                        <button className="flex items-center gap-1 text-blue-200 hover:text-white transition">
                            <FaShare className="text-sm" />
                            <span className="underline">Share</span>
                        </button>
                    </div>
                </div>
            </div>




            {/* Blog Content Section */}
            <div className="relative z-10 max-w-full mx-auto  mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl space-y-10"
                        >
                            {/* Cover Image */}
                            <img
                                className="rounded-2xl w-[400px] object-cover"
                                src="https://inceptionbd.com/store/1048/Untitled%20design%20(10).png"
                                alt="Python in 2025"
                            />

                            {/* Intro Paragraph */}
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                Python continues to dominate the programming world, with over 70% of developers ranking it among the top languages, and its relevance in 2025 is stronger than ever. Whether you are an aspiring developer, data scientist, or an experienced professional looking to upgrade your skills, Python remains an essential language to master. Here’s why learning Python in 2025 is a smart and necessary move:
                            </p>

                            {/* Section 1 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">1. Wide Range of Applications</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Python is a versatile language used across industries like AI-driven healthcare, automation, and more.
                                </p>
                                <ul className="list-none space-y-1 text-gray-700 dark:text-gray-300 text-base">
                                    <li>👉 Web Development: Django and Flask make web app development efficient.</li>
                                    <li>👉 Data Science: Pandas, NumPy, and Matplotlib for analysis and visualization.</li>
                                    <li>👉 AI & ML: TensorFlow, PyTorch, and Scikit-learn dominate the ML space.</li>
                                    <li>👉 Automation: Perfect for scripting repetitive tasks.</li>
                                    <li>👉 Game Development: Pygame supports small game projects.</li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">2. Beginner-Friendly Language</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Python’s syntax is clean and readable — great for learning core programming without confusion.
                                </p>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">3. High Demand in the Job Market</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Industries such as finance, healthcare, and tech actively seek Python developers.
                                </p>
                                <ul className="list-none space-y-1 text-gray-700 dark:text-gray-300 text-base">
                                    <li>👉 Building scalable apps.</li>
                                    <li>👉 Analyzing large datasets.</li>
                                    <li>👉 Developing AI-driven solutions.</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">4. Strong Community Support</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Platforms like Stack Overflow, GitHub, and Reddit offer tutorials, support, and open-source tools.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">5. Integration with Emerging Technologies</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Python integrates smoothly with blockchain, IoT, and even quantum computing.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">6. Career Advancement & Freelancing</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Python enables careers like Data Scientist, ML Engineer, Web Developer, and more.
                                </p>
                                <ul className="list-none space-y-1 text-gray-700 dark:text-gray-300 text-base">
                                    <li>👉 Data Scientist</li>
                                    <li>👉 Machine Learning Engineer</li>
                                    <li>👉 Web Developer</li>
                                    <li>👉 Automation Specialist</li>
                                    <li>👉 Software Developer — Great for freelance work too!</li>
                                </ul>
                            </div>

                            {/* Section 7 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">7. Open Source and Free</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Python is fully free with massive library support and learning resources for all.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">8. Supports Rapid Prototyping</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Ideal for MVPs in startups. You can prototype fast, get feedback, and iterate quickly.
                                </p>
                            </div>

                            {/* Conclusion */}
                            <div className="space-y-3">
                                <h2 className="text-[#00baff] text-2xl md:text-3xl font-bold">Conclusion</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-lg">
                                    Python is a future-proof, versatile tool — perfect for both beginners and experts in 2025. Start mastering it now to thrive in tech!
                                </p>
                            </div>

                            {/* Comment Section */}
                            <div className="space-y-4 pt-6 border-t border-gray-300 dark:border-gray-700">
                                <h2 className="text-2xl text-[#00baff] font-semibold">Comments</h2>
                                <textarea
                                    className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    rows="4"
                                    placeholder="Write your comment..."
                                />
                                <button className="bg-[#00baff] hover:bg-[#0099e6] text-white font-bold px-5 py-2 rounded-lg transition">
                                    Post Comment
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
                        >
                            <img className='w-32 h-32 rounded-full mx-auto mb-2' src="https://inceptionbd.com/store/1/1686419740636.jpg" alt="" />
                            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                                <li className='text-center font-bold md:text-xl text-lg'>Md Ridoy Hossain</li>

                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
                        >
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-300 dark:border-gray-700">
                                Categories
                            </h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {[
                                    "Programming",
                                    "Robotics",
                                    "Automation",
                                    "Artificial Intelligence (AI)",
                                    "Data Science",
                                ].map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-white hover:bg-blue-200 dark:hover:bg-gray-700 transition"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>



                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
                        >
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-300 dark:border-gray-700">
                                Recent Posts
                            </h3>
                            <div className="mt-4 space-y-6">
                                {[
                                    {
                                        img: "https://inceptionbd.com/store/1048/Untitled%20design%20(10).png",
                                        title: "Why You Need to Learn Python in 2025",
                                        date: "26 Jan 2025",
                                    },
                                    {
                                        img: "https://inceptionbd.com/store/1946/WhatsApp%20Image%202025-01-26%20at%2023.13.48_053c4dde.jpg",
                                        title: "Electrical Engineering and Automation...",
                                        date: "27 Jan 2025",
                                    },
                                    {
                                        img: "https://inceptionbd.com/store/1233/ai-background-artificial-intelligence-hand-vector-46752147.jpg",
                                        title: "The Importance of Artificial...",
                                        date: "26 Jan 2025",
                                    },
                                ].map((post, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-xl p-2 cursor-pointer"
                                    >
                                        <img
                                            className="w-20 h-20 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
                                            src={post.img}
                                            alt={post.title}
                                        />
                                        <div className="flex flex-col">
                                            <h4 className="text-md font-semibold text-gray-800 dark:text-white line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                                        </div>
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

export default BlogDetails;