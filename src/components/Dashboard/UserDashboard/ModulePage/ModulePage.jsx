import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { useGetSingleCourseQuery } from "../../../../redux/api/courseApi";
import getYouTubeVideoId from "../../../../utls/getYouTubeVideoId";

const ModulePage = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const { data: courseRes, isLoading } = useGetSingleCourseQuery(id, {
    skip: !id,
  });

  const [videoUrl, setVideoUrl] = useState(null);
  const [classUrl, setClassUrl] = useState(null);
  const [resourceUrl, setResourceUrl] = useState(null);

  useEffect(() => {
    if (classUrl) window.open(classUrl, "_blank");
  }, [classUrl]);

  useEffect(() => {
    if (resourceUrl) window.open(resourceUrl, "_blank");
  }, [resourceUrl]);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const course = courseRes?.data;
  const modulesData = course?.modules;

  // formatModulesArray ব্যবহার করে group করা
  const formatModulesArray = [
    {
      title: "Live Class",
      data: modulesData?.filter((m) => m.mode === "live"),
    },
    {
      title: "Recorded Class",
      data: modulesData?.filter((m) => m.mode === "recorded"),
    },
    {
      title: "Class Materials",
      data: modulesData?.filter((m) => m.mode === "resource"),
    },
  ];

  return (
    <div className="font-montserrat bg-gray-50 dark:bg-[#00091a] flex flex-col min-h-screen transition-colors duration-300">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
        <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
          {course?.title}
        </h1>

        <div className="flex items-center gap-4">
          <Link to="/student-dashboard/purchase-course">
            <button className="hidden md:block px-4 py-2 bg-gray-200 dark:bg-[#00baff] dark:text-white text-gray-800 rounded-lg hover:bg-gray-300 transition">
              My Courses
            </button>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl text-gray-700 dark:text-gray-300"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-6 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <button className="text-green-600 font-semibold border-b-2 border-green-600">
          Content
        </button>
      </div>

      {/* Main */}
      <div className="flex flex-1 relative">
        {/* Video Area */}
        <motion.div
          className="p-6 transition-all duration-500"
          animate={{
            width: isSidebarOpen ? "75%" : "100%",
          }}
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            {videoUrl ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  videoUrl
                )}?autoplay=1`}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="flex items-center justify-center h-full text-white">
                Select a lesson to start learning
              </p>
            )}
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
              className="absolute md:static right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col z-20 w-3/4 md:w-1/4"
            >
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Course Modules
                </h2>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {formatModulesArray.map((group, groupIdx) => (
                  <div key={groupIdx}>
                    <div
                      className="flex justify-between items-center cursor-pointer mb-2"
                      onClick={() =>
                        setExpandedGroup(
                          expandedGroup === groupIdx ? null : groupIdx
                        )
                      }
                    >
                      <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">
                        {group.title} ({group.data?.length || 0} Topics)
                      </h3>
                      {expandedGroup === groupIdx ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedGroup === groupIdx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-2 space-y-2"
                        >
                          {group.data?.map((module, idx) => (
                            <div
                              key={module.id}
                              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-2"
                            >
                              {/* Module Header */}
                              <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() =>
                                  setExpandedIndex(
                                    expandedIndex === module.id
                                      ? null
                                      : module.id
                                  )
                                }
                              >
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                  {module.topic}
                                </h4>
                                {expandedIndex === module.id ? (
                                  <FaChevronUp className="text-gray-500" />
                                ) : (
                                  <FaChevronDown className="text-gray-500" />
                                )}
                              </div>

                              {/* Module Contents */}
                              <AnimatePresence>
                                {expandedIndex === module.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 pl-3 border-l-2 border-green-500 space-y-2"
                                  >
                                    {module.contents?.map((content) => (
                                      <li
                                        key={content.id}
                                        className="p-2 rounded-md cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                                        onClick={() => {
                                          if (
                                            group.title === "Recorded Class"
                                          ) {
                                            setVideoUrl(content.content);
                                          } else if (
                                            group.title === "Class Materials"
                                          ) {
                                            setResourceUrl(content.content);
                                          } else {
                                            setClassUrl(content.content);
                                          }
                                        }}
                                      >
                                        {content.title}
                                      </li>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
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

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
// import { Link, useParams } from "react-router";
// import { useGetSingleCourseQuery } from "../../../../redux/api/courseApi";

// const ModulePage = () => {
//   const { id } = useParams();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const { data: courseRes, isLoading } = useGetSingleCourseQuery(id, {
//     skip: !id,
//   });

//   const [videoUrl, setVideoUrl] = useState(null);
//   const [classUrl, setClassUrl] = useState(null);
//   const [resoursceUrl, setResourceUrl] = useState(null);

//   useEffect(() => {
//     if (classUrl) window.open(classUrl, "_blank");
//   }, [classUrl]);

//   useEffect(() => {
//     if (resoursceUrl) window.open(resoursceUrl, "_blank");
//   }, [resoursceUrl]);

//   if (isLoading) return <p className="text-center py-10">Loading...</p>;

//   const course = courseRes?.data;
//   const modulesData = course?.modules;

//   const formatModulesArray = [
//     {
//       title: "Live Class",
//       data: modulesData?.filter((m) => m.mode === "live"),
//     },
//     {
//       title: "Recorded Class",
//       data: modulesData?.filter((m) => m.mode === "recorded"),
//     },
//     {
//       title: "Class Materials",
//       data: modulesData?.filter((m) => m.mode === "resource"),
//     },
//   ];

//   return (
//     <div className="font-montserrat bg-gray-50 dark:bg-[#00091a] flex flex-col min-h-screen transition-colors duration-300">
//       {/* Topbar */}
//       <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
//         <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
//           {course?.title}
//         </h1>

//         <div className="flex items-center gap-4">
//           <Link to="/student-dashboard/purchase-course">
//             <button className="hidden md:block px-4 py-2 bg-gray-200 dark:bg-[#00baff] dark:text-white text-gray-800 rounded-lg hover:bg-gray-300 transition">
//               My Courses
//             </button>
//           </Link>

//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="text-2xl text-gray-700 dark:text-gray-300"
//           >
//             {isSidebarOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-6 px-6 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
//         <button className="text-green-600 font-semibold border-b-2 border-green-600">
//           Content
//         </button>
//         {/* <button className="text-gray-600 dark:text-gray-300 hover:text-green-600">
//           Certificates
//         </button> */}
//       </div>

//       {/* Main */}
//       <div className="flex flex-1 relative">
//         {/* Video Area */}
//         <motion.div
//           className="p-6 transition-all duration-500"
//           animate={{
//             width: isSidebarOpen ? "75%" : "100%",
//           }}
//         >
//           <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
//             {videoUrl ? (
//               <iframe
//                 className="w-full h-full"
//                 src={videoUrl}
//                 title="Course Video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             ) : (
//               <p className="flex items-center justify-center h-full text-white">
//                 Select a lesson to start learning
//               </p>
//             )}
//           </div>
//         </motion.div>

//         {/* Sidebar */}
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               key="sidebar"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.3 }}
//               className="absolute md:static right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col z-20 w-3/4 md:w-1/4"
//             >
//               <div className="p-4 border-b dark:border-gray-700">
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
//                   Course Modules
//                 </h2>
//               </div>

//               <div className="p-4 space-y-4 overflow-y-auto flex-1">
//                 {formatModulesArray.map((module, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
//                   >
//                     {/* Module Header */}
//                     <div
//                       className="flex justify-between items-center cursor-pointer"
//                       onClick={() =>
//                         setExpandedIndex(expandedIndex === idx ? null : idx)
//                       }
//                     >
//                       <h3 className="font-semibold text-gray-800 dark:text-gray-200">
//                         {module.title} ({module.data?.length || 0} Topics)
//                       </h3>
//                       {expandedIndex === idx ? (
//                         <FaChevronUp className="text-gray-500" />
//                       ) : (
//                         <FaChevronDown className="text-gray-500" />
//                       )}
//                     </div>

//                     {/* Module Contents */}
//                     <AnimatePresence>
//                       {expandedIndex === idx && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-3 pl-4 border-l-2 border-green-500 space-y-2"
//                         >
//                           {module?.data?.map((mod, i) => (
//                             <div key={i} className="space-y-1">
//                               {/* Optionally show sub-module or topic title */}
//                               <h4 className="font-medium text-gray-700 dark:text-gray-300">
//                                 {mod.title || `Topic ${i + 1}`}
//                               </h4>
//                               <ul className="pl-4 list-disc space-y-1">
//                                 {mod?.contents?.map((content, ci) => (
//                                   <li
//                                     key={`${i}-${ci}`}
//                                     className="p-2 rounded-md cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
//                                     onClick={() => {
//                                       if (module.title === "Recorded Class") {
//                                         setVideoUrl(content.content);
//                                       } else if (
//                                         module.title === "Class Materials"
//                                       ) {
//                                         setResourceUrl(content.content);
//                                       } else {
//                                         setClassUrl(content.content);
//                                       }
//                                     }}
//                                   >
//                                     {content?.title}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))}

//                 {/* {formatModulesArray.map((module, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
//                   >
//                     <div
//                       className="flex justify-between items-center cursor-pointer"
//                       onClick={() =>
//                         setExpandedIndex(expandedIndex === idx ? null : idx)
//                       }
//                     >
//                       <h3 className="font-semibold text-gray-800 dark:text-gray-200">
//                         {module.title} ({module.data?.length || 0} Topics)
//                       </h3>
//                       {expandedIndex === idx ? (
//                         <FaChevronUp className="text-gray-500" />
//                       ) : (
//                         <FaChevronDown className="text-gray-500" />
//                       )}
//                     </div>

//                     <AnimatePresence>
//                       {expandedIndex === idx && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-3 pl-3 border-l-2 border-green-500 space-y-2"
//                         >
//                           {module?.data?.map((mod, i) => (
//                             <React.Fragment key={i}>
//                               {mod?.contents?.map((content, ci) => (
//                                 <li
//                                   key={`${i}-${ci}`}
//                                   className="p-2 rounded-md cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
//                                   onClick={() => {
//                                     if (module.title === "Recorded Class") {
//                                       setVideoUrl(content.content);
//                                     } else if (
//                                       module.title === "Class Materials"
//                                     ) {
//                                       setResourceUrl(content.content);
//                                     } else {
//                                       setClassUrl(content.content);
//                                     }
//                                   }}
//                                 >
//                                   {content?.title}
//                                 </li>
//                               ))}
//                             </React.Fragment>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))} */}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ModulePage;
