import React from 'react';
import { Link } from 'react-router';

const AllCoursesGrid = () => {
    const courses = [
        {
            id: 1,
            title: "Advanced Web Development",
            instructor: "Sarah Johnson",
            instructorImage: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4.9,
            students: 12500,
            price: 89.99,
            thumbnail: "https://rabbil.com/files/gitS.jpg",
            category: "Development",
            duration: "32 hours",
        },
        {
            id: 2,
            title: "Data Science Fundamentals",
            instructor: "Michael Chen",
            instructorImage: "https://randomuser.me/api/portraits/men/47.jpg",
            rating: 4.8,
            students: 9800,
            price: 99.99,
            thumbnail: "https://rabbil.com/files/nextjs.webp",
            category: "Data Science",
            duration: "45 hours",
        },
        {
            id: 3,
            title: "UX/UI Design Masterclass",
            instructor: "Emma Rodriguez",
            instructorImage: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 4.7,
            students: 8450,
            price: 79.99,
            thumbnail: "https://rabbil.com/files/nextjs.webp",
            category: "Design",
            duration: "28 hours",
        },
        {
            id: 4,
            title: "Mobile App Development",
            instructor: "David Wilson",
            instructorImage: "https://randomuser.me/api/portraits/men/52.jpg",
            rating: 4.9,
            students: 11200,
            price: 94.99,
            thumbnail: "https://rabbil.com/files/flutterS.png",
            category: "Development",
            duration: "38 hours",
        },
        {
            id: 5,
            title: "Digital Marketing Strategy",
            instructor: "Jennifer Lee",
            instructorImage: "https://randomuser.me/api/portraits/women/50.jpg",
            rating: 4.6,
            students: 7600,
            price: 74.99,
            thumbnail: "https://rabbil.com/files/sweS.webp",
            category: "Marketing",
            duration: "25 hours",
        },
        {
            id: 6,
            title: "Robotics Automation",
            instructor: "Jennifer Lee",
            instructorImage: "https://randomuser.me/api/portraits/women/50.jpg",
            rating: 4.6,
            students: 7600,
            price: 80.99,
            thumbnail: "https://rabbil.com/files/sweS.webp",
            category: "Engineering",
            duration: "25 hours",
        },
    ];

    return (
        <div className="py-24 px-2 max-w-full mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff]">
                    🎓 Explore All Our Courses
                </h2>
                <p className="mt-4 text-sm md:text-xl text-gray-600 dark:text-gray-300">
                    Find the perfect course to power your career.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute top-4 left-4 bg-[#00baff] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                {course.category}
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <img
                                    src={course.instructorImage}
                                    alt={course.instructor}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span>
                                    Instructor:{" "}
                                    <span className="font-medium">{course.instructor}</span>
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                                <span>
                                    ⭐ {course.rating} ({Math.floor(course.students / 1000)}k+
                                    students)
                                </span>
                                <span>{course.duration}</span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${course.price}
                                    </span>
                                    {course.price > 80 && (
                                        <span className="ml-2 text-sm text-gray-400 line-through">
                                            ${course.price + 30}
                                        </span>
                                    )}
                                </div>
                               <Link to='/coursedetails'>
                                <button className="bg-[#00baff] hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                                    Enroll Now
                                </button>
                               </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCoursesGrid;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const AllCoursesGrid = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/v1/courses"); // backend API
//         const data = response.data.data || [];

//         // Ensure instructor info & category exists
//         const coursesWithDefaults = data.map((course) => ({
//           ...course,
//           instructorName: course.instructor?.name || "Unknown",
//           instructorImage:
//             course.instructor?.image ||
//             "https://randomuser.me/api/portraits/lego/1.jpg",
//           category: course.category || "General",
//           thumbnail:
//             course.thumbnail ||
//             "https://via.placeholder.com/400x200?text=Course+Image",
//           rating: course.rating || 4.5,
//           students: course.students || 0,
//           duration: course.duration || "N/A",
//           price: course.price || 0,
//         }));

//         setCourses(coursesWithDefaults);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch courses.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading)
//     return <div className="text-center py-20 text-lg">Loading courses...</div>;
//   if (error)
//     return <div className="text-center py-20 text-red-500">{error}</div>;

//   return (
//     <div className="py-24 px-2 max-w-full mx-auto">
//       <div className="text-center mb-16">
//         <h2 className="text-2xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff]">
//           🎓 Explore All Our Courses
//         </h2>
//         <p className="mt-4 text-sm md:text-xl text-gray-600 dark:text-gray-300">
//           Find the perfect course to power your career.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {courses.map((course) => (
//           <div
//             key={course._id || course.id}
//             className="bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
//           >
//             <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
//               <img
//                 src={course.thumbnail}
//                 alt={course.title}
//                 className="w-full h-full object-cover object-center"
//               />
//               <div className="absolute top-4 left-4 bg-[#00baff] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
//                 {course.category}
//               </div>
//             </div>

//             <div className="p-6 space-y-3">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
//                 {course.title}
//               </h3>

//               <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                 <img
//                   src={course.instructorImage}
//                   alt={course.instructorName}
//                   className="w-6 h-6 rounded-full object-cover"
//                 />
//                 <span>
//                   Instructor:{" "}
//                   <span className="font-medium">{course.instructorName}</span>
//                 </span>
//               </div>

//               <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
//                 <span>
//                   ⭐ {course.rating} ({Math.floor(course.students / 1000)}k+
//                   students)
//                 </span>
//                 <span>{course.duration} hours</span>
//               </div>

//               <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <div>
//                   <span className="text-xl font-bold text-gray-900 dark:text-white">
//                     ৳{course.price}
//                   </span>
//                   {course.price > 80 && (
//                     <span className="ml-2 text-sm text-gray-400 line-through">
//                       ৳{course.price + 30}
//                     </span>
//                   )}
//                 </div>
//                 <Link to="/coursedetails">
//                   <button className="bg-[#00baff] hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
//                     Enroll Now
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllCoursesGrid;
