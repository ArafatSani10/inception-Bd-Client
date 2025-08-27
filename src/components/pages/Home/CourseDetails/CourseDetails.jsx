// import { Helmet } from "react-helmet";
// import { MdDone, MdFavorite, MdOutlineDone, MdOutlineLightbulb } from "react-icons/md";
// import { AiOutlineLike } from "react-icons/ai";
// import { FaAddressCard, FaHeadphones, FaMinus, FaPlus } from "react-icons/fa";
// import { CiCalendar, CiShare2, CiTimer } from "react-icons/ci";
// import { GrGift } from "react-icons/gr";
// import { GoPersonAdd } from "react-icons/go";
// import { PiStudent } from "react-icons/pi";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import ReviewsSection from "./ReviewsSection";

// const CourseDetails = () => {
//     const faqs = [
//         {
//             question: "Is your course lifetime access?",
//             answer: "Yes, once purchased, you will have lifetime access to our course.",
//         },
//         {
//             question: "Will I get support?",
//             answer: "We provide 24/7 support via Facebook, Email, and Live Chat.",
//         },
//         {
//             question: "Do I need any prior knowledge to take the course?",
//             answer: "No, our course is beginner-friendly — everything is taught step by step.",
//         },
//     ];

//     const [openIndex, setOpenIndex] = useState(null);
//     const [activeTab, setActiveTab] = useState("information");

//     const toggleFAQ = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     return (
//         <div className="max-w-full p-3 bg-gray-100 dark:bg-[#0f172a] text-black dark:text-white">
//             {/* Background Image Section */}
//             <div className="relative w-full h-auto">
//                 <div className="relative w-full h-[150px] mt-10 lg:h-[300px] overflow-hidden">
//                     <img
//                         src="https://inceptionbd.com/store/1/Course/Generative%20AI%20cover.png"
//                         alt="Course Background"
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="hidden lg:block max-sm:block absolute inset-0 bg-black/60 dark:bg-black/70 "></div>
//                 </div>

//                 <div className="mx-auto w-full px-2 py-8 rounded-xl bg-white dark:bg-transparent relative z-10">
//                     <h1 className="text-[#00baff] dark:text-[#38bdf8] text-2xl lg:text-4xl font-bold mb-3 leading-tight text-start lg:text-left">
//                        Master Generative  (AI) course in bangla
//                     </h1>

//                     <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-3 justify-center lg:justify-start">
//                         <h2 className="font-semibold text-base text-gray-900 dark:text-gray-200 underline">
//                             <span className="text-black dark:text-white">Artificial Intelligence (AI)</span>
//                         </h2>

//                         <div className="flex items-center">
//                             {Array(5)
//                                 .fill("★")
//                                 .map((star, i) => (
//                                     <span key={i} className="text-yellow-400 dark:text-yellow-300 text-xl">
//                                         {star}
//                                     </span>
//                                 ))}
//                         </div>
//                     </div>

//                     <p className="text-sm text-gray-800 dark:text-gray-300 mb-6 text-start lg:text-left">
//                         created by{" "}
//                         <span className="underline font-medium cursor-pointer hover:text-[#00baff] dark:hover:text-[#38bdf8] transition">
//                          Boktiar Ahmed Bappy
//                         </span>
//                     </p>

//                     <div className="w-full flex justify-start lg:justify-start">
//                         <button className="px-6 py-2 bg-[#00baff] hover:bg-[#009edb] dark:bg-[#38bdf8] dark:hover:bg-[#1ba7e1] text-white font-semibold rounded-full shadow-md transition-all duration-300">
//                             Enroll on Course
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Flex Section */}
//             <div className="flex flex-col sm:flex-row mt-4">
//                 {/* Left Side with Tabs */}
//                 <div className="w-full mx-auto border-2 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
//                     {/* Tabs */}
//                     <div className="flex border-b border-gray-300 dark:border-gray-700">
//                         <button
//                             onClick={() => setActiveTab("information")}
//                             className={`flex-1 py-3 text-center font-semibold uppercase tracking-wide ${activeTab === "information"
//                                 ? "border-b-4 border-[#00baff] text-[#00baff]"
//                                 : "text-gray-500 hover:text-[#00baff]"
//                                 }`}
//                         >
//                             Information
//                         </button>
//                         <button
//                             onClick={() => setActiveTab("content")}
//                             className={`flex-1 py-3 text-center font-semibold uppercase tracking-wide ${activeTab === "content"
//                                 ? "border-b-4 border-[#00baff] text-[#00baff]"
//                                 : "text-gray-500 hover:text-[#00baff]"
//                                 }`}
//                         >
//                             Content
//                         </button>
//                         <button
//                             onClick={() => setActiveTab("review")}
//                             className={`flex-1 py-3 text-center font-semibold uppercase tracking-wide ${activeTab === "review"
//                                 ? "border-b-4 border-[#00baff] text-[#00baff]"
//                                 : "text-gray-500 hover:text-[#00baff]"
//                                 }`}
//                         >
//                             Review
//                         </button>
//                     </div>

//                     {/* Tab Contents */}
//                     <div className="w-full p-3">
//                         {activeTab === "information" && (
//                             <>
//                                 {/* Existing left side content exactly as is */}
//                                 <h1 className="text-lg font-bold mb-4 text-[#00baff]">What You Will Learn?</h1>
//                                 <div className="p-2 dark:bg-gray-800 space-y-3 rounded-md">
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Understand the fundamentals of Generative AI
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Work with LLMS and GANS for next and image generation.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Learn to Optimize AI models for better experience
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Explore ethical considerations in AI content generation.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Build and train advanced Generative Models.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Develop real-world projects like chatbots and image creators.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Deploy Generative AI applications into production.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Gain hands-on experience with cutting-edge tools and frameworks.
//                                     </p>
//                                 </div>

//                                 <h1 className="font-bold text-xl mt-6 text-[#00baff] ">About This Course</h1>
//                                 <p className="opacity-70 border p-3 md:text-lg text-sm mt-3 dark:border-gray-700 dark:bg-gray-800">
//                                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus amet odit pariatur sequi suscipit ab iste dolores. Sapiente dolore numquam incidunt rerum repellat fugit distinctio sequi earum pariatur odit, fuga ratione natus! Eveniet architecto ducimus harum impedit ad accusamus in quaerat modi doloribus, perspiciatis a corporis, nulla placeat commodi quae odit sapiente non facere. Eum, dolorum? Vero culpa doloribus reprehenderit natus provident, totam a, similique expedita eveniet dolor cupiditate accusamus facere assumenda aspernatur labore esse cum quam rerum! Hic, est temporibus repudiandae, placeat similique ut iusto saepe, rerum soluta fuga vitae architecto minima? Magnam harum beatae alias sequi voluptatum odio.
//                                 </p>

//                                 <h1 className="text-lg font-bold mt-6 text-[#00baff]">Requirements</h1>
//                                 <div className="p-2 bg-base-200 dark:bg-gray-800 space-y-4 rounded-md">
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Basic understanding of AI and machine learning.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Proficiency in Python Programming.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Familiarity with ML frameworks like TensorFlow or PyTorch.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Knowledge of neural networks and deep learning concepts.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Basic experience with data preprocessing and visualization.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Understanding of probability and statistics.
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Familiarity with cloud platforms (optional).
//                                     </p>
//                                     <p className="flex items-center gap-2">
//                                         <MdOutlineDone /> Interest in creative AI applications.
//                                     </p>
//                                 </div>

//                                 <div className="space-y-4 mt-10">
//                                     <h1 className="md:text-2xl text-[#00baff] font-bold ">FAQ</h1>
//                                     {faqs.map((faq, index) => (
//                                         <div
//                                             key={index}
//                                             className="border border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden"
//                                         >
//                                             <button
//                                                 onClick={() => toggleFAQ(index)}
//                                                 className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 text-left"
//                                             >
//                                                 <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
//                                                     {faq.question}
//                                                 </span>
//                                                 <span className="text-blue-600 dark:text-blue-400">
//                                                     {openIndex === index ? <FaMinus /> : <FaPlus />}
//                                                 </span>
//                                             </button>

//                                             <AnimatePresence initial={false}>
//                                                 {openIndex === index && (
//                                                     <motion.div
//                                                         key="content"
//                                                         initial={{ height: 0, opacity: 0 }}
//                                                         animate={{ height: "auto", opacity: 1 }}
//                                                         exit={{ height: 0, opacity: 0 }}
//                                                         transition={{ duration: 0.3 }}
//                                                     >
//                                                         <div className="px-6 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-700">
//                                                             {faq.answer}
//                                                         </div>
//                                                     </motion.div>
//                                                 )}
//                                             </AnimatePresence>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="mt-6">
//                                     <h1 className="text-2xl text-[#00baff] font-semibold">Comments</h1>
//                                     <textarea
//                                         className="w-full p-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600"
//                                         rows="4"
//                                         placeholder="Write your comment..."
//                                     ></textarea>
//                                     <button className="mt-3 px-4 py-2 bg-[#00baff] text-white rounded-lg font-bold">
//                                         Post Comment
//                                     </button>
//                                 </div>
//                             </>
//                         )}

//                         {activeTab === "content" && (
//                             <div>
//                                 <h2 className="text-2xl font-bold text-[#00baff] mb-4">Course Content</h2>
//                                 <p className="text-gray-700 dark:text-gray-300">
//                                     This tab can include detailed curriculum, modules, lesson plan, videos, or downloadable
//                                     resources.
//                                 </p>
//                             </div>
//                         )}

//                         {activeTab === "review" && (
//                             <div>
//                                 <ReviewsSection></ReviewsSection>
//                             </div>
//                         )}
//                     </div>
//                 </div>


//                 {/* Right Side */}
//                 <div className="w-full  max-sm:mt-10 sm:w-[500px] bg-base-200 dark:bg-gray-800 p-3  rounded-lg">
//                     <div className="card bg-base-100 dark:bg-gray-900 w-full sm:w-96 shadow-xl">
//                         <figure>
//                             <img className="rounded-xl" src="https://inceptionbd.com/store/1/Course/Master%20Generativ%20AI.png" alt="courses" />
//                         </figure>
//                         <div>
//                             <h1 className="text-green-500 dark:text-green-300 text-4xl text-center font-bold mt-5 my-5">Free</h1>
//                             <div className="flex justify-center">
//                                 <button className="p-2 text-center bg-[#00baff]  hover:bg-gray-800 transition-all duration-300 rounded-xl my-2 text-white">
//                                     Enroll on course
//                                 </button>
//                             </div>

//                             <div className="text-center text-sm opacity-60">
//                                 <h1 className="flex gap-1 justify-center items-center">5 Days money back guarantee</h1>
//                             </div>

//                             <div>
//                                 <h1 className="font-bold mt-6  text-[#00baff] mx-3">This live class includes:</h1>
//                                 <div className="space-y-2 text-sm opacity-70 p-5">
//                                     <h1 className="flex items-center gap-1"><MdOutlineLightbulb /> Official certificate</h1>
//                                     <h1 className="flex items-center gap-1"><FaHeadphones /> Instructor support</h1>
//                                 </div>
//                             </div>

//                             <div className="border-2 mx-2 mt-5 shadow-xl rounded-lg p-3 flex items-center justify-center gap-2 dark:border-gray-700">
//                                 <h1 className="flex-col px-3"><CiCalendar className="mx-5" /> Reminder</h1>
//                                 <h1 className="flex-col px-3"><MdFavorite className="mx-5" /> Favorite</h1>
//                                 <h1 className="flex-col px-3"><CiShare2 className="mx-3" /> Share</h1>
//                             </div>

//                             <div className="mt-5 mx-2 my-3 gap-3 border-2 p-2 rounded-xl flex items-center dark:border-gray-700">
//                                 <h1 className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-700 flex justify-center items-center">
//                                     <GrGift />
//                                 </h1>
//                                 <div>
//                                     <h1 className="font-bold opacity-70 text-[#00baff]">Gift this course</h1>
//                                     <p className="text-[12px]">send this course as a gift to your friends..</p>
//                                 </div>
//                             </div>

//                             <div className="mx-2 mt-5 border-2 shadow-xl rounded-lg p-6 dark:border-gray-700">
//                                 <h1 className="font-bold text-[#00baff]">Live class specifications</h1>
//                                 <h1 className="h-1 w-9 bg-green-500 border"></h1>
//                                 <div className="space-y-5 mt-5 opacity-70">
//                                     <div className="flex justify-between"><span className="flex items-center gap-2"><CiCalendar />Start date :</span><h1>3 Feb 2025 | 19:00</h1></div>
//                                     <div className="flex justify-between"><span className="flex items-center gap-2"><GoPersonAdd />Capacity :</span><h1>unlimited</h1></div>
//                                     <div className="flex justify-between"><span className="flex items-center gap-2"><CiTimer />Duration :</span><h1>5:00 Hours </h1></div>
//                                     <div className="flex justify-between"><span className="flex items-center gap-2"><PiStudent />Students :</span><h1>49</h1></div>
//                                     <div className="flex justify-between"><span className="flex items-center gap-2"><FaAddressCard />Sessions :</span><h1>0</h1></div>
//                                 </div>
//                             </div>

//                             {/* Instructor */}
//                             <div className="mx-2 mt-5 border-2 shadow-xl rounded-lg p-3 my-2 dark:border-gray-700">
//                                 <div className="mt-5 my-5 flex justify-center">
//                                     <img className="w-52 h-52 rounded-full" src="https://inceptionbd.com/store/1/IMG_8206.jpg" alt="" />

//                                 </div>
//                                 <div className="text-center">
//                                     <h1 className="text-xl font-bold text-[#00baff] opacity-90">Boktiar Ahmed Bappy</h1>
//                                     <p className="text-sm mt-2 max-sm:text-sm opacity-70">AI Engineer, YouTuber, Mentor & Entrepreneur.</p>
//                                     <div className="mt-2 text-yellow-400 font-bold text-2xl">★★★★★</div>
//                                     <button className=" text-white bg-[#00baff] w-2/3 mt-3 h-10 rounded-lg">Profile</button>
//                                 </div>
//                             </div>

//                             {/* Tags */}
//                             <div className="mx-2 mt-5 border-2 shadow-xl rounded-lg p-6 dark:border-gray-800">
//                                 <div className="mb-5">
//                                     <h1 className="font-bold opacity-80 text-[#00baff]">Tags</h1>
//                                     <h1 className="h-1 w-12 bg-green-500 border"></h1>
//                                 </div>
//                                 <div className="space-y-3">
//                                     {[
//                                         "Generative AI Course In Bangla",
//                                         "Generative AI Course Hands-on Projects",
//                                         "LLMs Course Bangla",
//                                         "GANs Bangla Tutorial",
//                                         "Learn Generative AI",
//                                     ].map((tag, idx) => (
//                                         <h1 key={idx} className=" text-xs p-4 bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg transition-all duration-300">
//                                             {tag}
//                                         </h1>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourseDetails;

import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


const CourseDetails = () => {
    const { idOrSlug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/courses/dfdfadf${id}`);
                setCourse(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [idOrSlug]);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!course) return <p className="text-center py-10">Course not found.</p>;



    return (
        <div className="max-w-6xl mx-auto mt-20  p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white ">
            
        </div>
    );
};

export default CourseDetails;

