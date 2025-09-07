// import React, { useState, useEffect } from "react";
// import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const statusColors = {
//   Draft: "bg-yellow-400",
//   Published: "bg-green-500",
//   Unpublished: "bg-gray-500",
// };

// const formatDate = (dateStr) => {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   return date.toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openIndex, setOpenIndex] = useState(null);

//   // Filters
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [instructorFilter, setInstructorFilter] = useState("");
//   const [approvalFilter, setApprovalFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [perPage, setPerPage] = useState(10);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);

//         const data = response.data.data || [];
//         const coursesWithDefaults = data.map((course) => ({
//           ...course,
//           instructor: course.instructor || { name: "Unknown" },
//           category: course.category || { name: "Unknown" },
//         }));

//         setCourses(coursesWithDefaults);
//       } catch (err) {
//         setError("Failed to fetch courses.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const instructorNames = [...new Set(courses.map((c) => c.instructor?.name))];
//   const categories = [...new Set(courses.map((c) => c.category?.name))];
//   const statuses = [...new Set(courses.map((c) => c.status))];
//   const approvals = [...new Set(courses.map((c) => c.approval))];

//   useEffect(() => {
//     let temp = [...courses];

//     if (search) {
//       const s = search.toLowerCase();
//       temp = temp.filter(
//         (c) =>
//           c.title?.toLowerCase().includes(s) ||
//           c.category?.name?.toLowerCase().includes(s) ||
//           c.instructor?.name?.toLowerCase().includes(s)
//       );
//     }
//     if (categoryFilter) temp = temp.filter((c) => c.category?.name === categoryFilter);
//     if (instructorFilter) temp = temp.filter((c) => c.instructor?.name === instructorFilter);
//     if (approvalFilter) temp = temp.filter((c) => c.approval === approvalFilter);
//     if (statusFilter) temp = temp.filter((c) => c.status === statusFilter);

//     setFilteredCourses(temp.slice(0, perPage));
//   }, [courses, search, categoryFilter, instructorFilter, approvalFilter, statusFilter, perPage]);

//   const handleEdit = (course) => console.log("Edit clicked:", course.title);
//   const handleDelete = (course) => console.log("Delete clicked:", course.title);

//   if (loading) return <div className="p-6 text-center">⏳ Loading courses...</div>;
//   if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-[#00baff]">📚 Courses</h1>
//         <Link to="/dashboard/course-form">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
//             + Add New
//           </button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <input
//           type="text"
//           placeholder="🔍 Search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="col-span-2 p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
//         />

//         <select
//           className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <select
//           className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
//           value={instructorFilter}
//           onChange={(e) => setInstructorFilter(e.target.value)}
//         >
//           <option value="">All Instructors</option>
//           {instructorNames.map((name, i) => (
//             <option key={i} value={name}>{name}</option>
//           ))}
//         </select>

//         <select
//           className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="">All Status</option>
//           {statuses.map((s, i) => (
//             <option key={i} value={s}>{s}</option>
//           ))}
//         </select>

//         <select
//           className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
//           value={approvalFilter}
//           onChange={(e) => setApprovalFilter(e.target.value)}
//         >
//           <option value="">All Approvals</option>
//           {approvals.map((a, i) => (
//             <option key={i} value={a}>{a}</option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
//         <table className="w-full text-sm border-collapse">
//           <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
//             <tr>
//               {["SN", "Course Name", "Instructor", "Price", "Students", "Created", "Updated", "Status", "Approval", "Actions"].map((h, i) => (
//                 <th key={i} className="px-4 py-3 text-left font-medium">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCourses.map((course, i) => (
//               <tr key={i} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
//                 <td className="px-4 py-3">{i + 1}</td>

//                 <td className="px-4 py-3">
//                   <div className="font-semibold text-gray-800 dark:text-gray-200">{course.title}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">{course.category?.name}</div>
//                 </td>

//                 <td className="px-4 py-3">{course.instructor?.name}</td>
//                 <td className="px-4 py-3">${course.price}</td>
//                 <td className="px-4 py-3">{course.students || 0}</td>
//                 <td className="px-4 py-3">{formatDate(course.createdAt)}</td>
//                 <td className="px-4 py-3">{formatDate(course.updatedAt)}</td>

//                 <td className="px-4 py-3">
//                   <span className={`px-3 py-1 text-xs rounded-full text-white ${statusColors[course.status] || "bg-gray-500"}`}>
//                     {course.status}
//                   </span>
//                 </td>

//                 <td className="px-4 py-3">
//                   <select
//                     defaultValue={course.approval}
//                     className="p-1 border rounded text-sm dark:bg-gray-900 dark:text-white"
//                   >
//                     <option>Pending</option>
//                     <option>Approved</option>
//                     <option>Rejected</option>
//                   </select>
//                 </td>

//                 <td className="px-4 py-3">
//                   <div className="flex items-center space-x-2">
//                     <Link to={`/dashboard/update-course/${course._id}`}>
//                       <button
//                         onClick={() => handleEdit(course)}
//                         className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
//                       >
//                         <FiEdit className="mr-1" /> Edit
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(course)}
//                       className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition"
//                     >
//                       <FiTrash2 className="mr-1" /> Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default CourseList;



import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const statusColors = {
  Draft: "bg-yellow-400",
  Published: "bg-green-500",
  Unpublished: "bg-gray-500",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrollCounts, setEnrollCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [perPage, setPerPage] = useState(10);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        const data = response.data.data || [];
        const coursesWithDefaults = data.map((course) => ({
          ...course,
          instructor: course.instructor || { name: "Unknown" },
          category: course.category || { name: "Unknown" },
        }));
        setCourses(coursesWithDefaults);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch all orders and count students per course
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        const allOrders = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : Array.isArray(res.data.orders)
              ? res.data.orders
              : [];

        const counts = {};
        allOrders.forEach((order) => {
          if (!order.course) return;
          let courseId = order.course;
          if (typeof courseId === "object" && courseId._id) courseId = courseId._id;
          courseId = String(courseId);
          counts[courseId] = (counts[courseId] || 0) + 1;
        });

        console.log("Enroll Counts:", JSON.stringify(counts, null, 2));
        setEnrollCounts(counts);
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
      }
    };
    fetchEnrollments();
  }, []);

  // Filters
  const instructorNames = [...new Set(courses.map((c) => c.instructor?.name))];
  const categories = [...new Set(courses.map((c) => c.category?.name))];
  const statuses = [...new Set(courses.map((c) => c.status))];
  const approvals = [...new Set(courses.map((c) => c.approval))];

  useEffect(() => {
    let temp = [...courses];

    if (search) {
      const s = search.toLowerCase();
      temp = temp.filter(
        (c) =>
          c.title?.toLowerCase().includes(s) ||
          c.category?.name?.toLowerCase().includes(s) ||
          c.instructor?.name?.toLowerCase().includes(s)
      );
    }
    if (categoryFilter) temp = temp.filter((c) => c.category?.name === categoryFilter);
    if (instructorFilter) temp = temp.filter((c) => c.instructor?.name === instructorFilter);
    if (approvalFilter) temp = temp.filter((c) => c.approval === approvalFilter);
    if (statusFilter) temp = temp.filter((c) => c.status === statusFilter);

    setFilteredCourses(temp.slice(0, perPage));
  }, [courses, search, categoryFilter, instructorFilter, approvalFilter, statusFilter, perPage]);

  const handleEdit = (course) => console.log("Edit clicked:", course.title);
  const handleDelete = (course) => console.log("Delete clicked:", course.title);

  if (loading) return <div className="p-6 text-center">⏳ Loading courses...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#00baff]">📚 Courses</h1>
        <Link to="/dashboard/course-form">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
            + Add New
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="🔍 Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-2 p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
        />

        <select
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
          value={instructorFilter}
          onChange={(e) => setInstructorFilter(e.target.value)}
        >
          <option value="">All Instructors</option>
          {instructorNames.map((name, i) => (
            <option key={i} value={name}>{name}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {statuses.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
          value={approvalFilter}
          onChange={(e) => setApprovalFilter(e.target.value)}
        >
          <option value="">All Approvals</option>
          {approvals.map((a, i) => (
            <option key={i} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <tr>
              {["SN", "Course Name", "Instructor", "Price", "Students", "Created", "Updated", "Status", "Approval", "Actions"].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, i) => (
              <tr key={i} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{course.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{course.category?.name}</div>
                </td>
                <td className="px-4 py-3">{course.instructor?.name}</td>
                <td className="px-4 py-3">${course.price}</td>
                {/* <td className="px-4 py-3">{enrollCounts[String(course._id)] ?? 0}</td> */}
                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/course-students/${course._id}`}
                    className="text-blue-600 text-sm underline"
                  >
                    {enrollCounts[String(course._id)] ?? 0}
                  </Link>
                </td>
                <td className="px-4 py-3">{formatDate(course.createdAt)}</td>
                <td className="px-4 py-3">{formatDate(course.updatedAt)}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 text-xs rounded-full text-white ${statusColors[course.status] || "bg-gray-500"}`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={course.approval}
                    className="p-1 border rounded text-sm dark:bg-gray-900 dark:text-white"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Link to={`/dashboard/update-course/${course._id}`}>
                      <button
                        onClick={() => handleEdit(course)}
                        className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
                      >
                        <FiEdit className="mr-1" /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(course)}
                      className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CourseList;
