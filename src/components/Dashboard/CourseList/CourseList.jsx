import React, { useState, useEffect } from "react";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
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
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  // Filters
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
        const response = await axios.get("http://localhost:5000/api/v1/courses");
        
        const data = response.data.data || [];
        console.log("course data", data)
        const coursesWithDefaults = data.map((course) => ({
          ...course,
          instructor: course.instructor || { name: "Unknown" },
          category: course.category || "Unknown",
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

  // Dynamic filter options
  const instructorNames = [...new Set(courses.map((c) => c.instructor?.name))];
  console.log("instructorsNames", instructorNames);
  const categories = [...new Set(courses.map((c) => c.category))];
  const statuses = [...new Set(courses.map((c) => c.status))];
  const approvals = [...new Set(courses.map((c) => c.approval))];

  // Apply filters
  useEffect(() => {
    let temp = [...courses];

    if (search) {
      const s = search.toLowerCase();
      temp = temp.filter(
        (c) =>
          c.title.toLowerCase().includes(s) ||
          c.category.toLowerCase().includes(s) ||
          c.instructor.name.toLowerCase().includes(s)
      );
    }
    if (categoryFilter) temp = temp.filter((c) => c.category === categoryFilter);
    if (instructorFilter) temp = temp.filter((c) => c.instructor.name === instructorFilter);
    if (approvalFilter) temp = temp.filter((c) => c.approval === approvalFilter);
    if (statusFilter) temp = temp.filter((c) => c.status === statusFilter);

    setFilteredCourses(temp.slice(0, perPage));
  }, [courses, search, categoryFilter, instructorFilter, approvalFilter, statusFilter, perPage]);

  const handleEdit = (course) => console.log("Edit clicked:", course.title);
  const handleDelete = (course) => console.log("Delete clicked:", course.title);

  if (loading) return <div className="p-6 text-center">Loading courses...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="mb-4 text-2xl font-bold text-[#00baff]">Courses</div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-1 md:col-span-1 p-2 border rounded dark:bg-gray-900 dark:text-white"
        />

        <select
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          value={instructorFilter}
          onChange={(e) => setInstructorFilter(e.target.value)}
        >
          <option value="">All Instructors</option>
          {instructorNames?.map((name, i) => (
            <option key={i} value={name?.name}>
              {name?.name}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {statuses.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          value={approvalFilter}
          onChange={(e) => setApprovalFilter(e.target.value)}
        >
          <option value="">All Approvals</option>
          {approvals.map((a, i) => (
            <option key={i} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={10}>Per Page 10</option>
          <option value={50}>Per Page 50</option>
          <option value={100}>Per Page 100</option>
        </select>

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("");
            setInstructorFilter("");
            setApprovalFilter("");
            setStatusFilter("");
          }}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-[#00baff]">Course List</h1>
          <Link to="/dashboard/course-form">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + Add New
            </button>
          </Link>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Instructor</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Students</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3">Update Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Approve</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, i) => (
              <tr key={i} className="border-t dark:border-gray-700">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-500">{course.category}</div>
                </td>
                <td className="px-4 py-3">{course.instructor}</td>
                <td className="px-4 py-3">{course.price}</td>
                <td className="px-4 py-3">{course.students}</td>
                <td className="px-4 py-3">{formatDate(course.createdAt)}</td>
                <td className="px-4 py-3">{formatDate(course.updatedAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded text-white ${
                      statusColors[course.status] || "bg-gray-500"
                    }`}
                  >
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
                <td className="px-4 py-3 relative">
                  <button
                    className="text-blue-600 dark:text-blue-400"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <FiMoreVertical size={18} />
                  </button>

                  {openIndex === i && (
                    <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                      <Link to="/dashboard/update-course">
                        <button
                          onClick={() => handleEdit(course)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FiEdit className="mr-2" /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(course)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
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
