import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  useDeleteOneMutation,
  useUpdateOneMutation,
} from "../../../redux/api/courseApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState("");
  const [updateCourse] = useUpdateOneMutation();
  const [deleteCourse] = useDeleteOneMutation();

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses`
        );
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

  // Fetch enroll counts
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
        allOrders?.filter((order) => order.status === "complete").forEach((order) => {
          if (!order.course) return;
          let courseId = order.course;
          if (typeof courseId === "object" && courseId._id)
            courseId = courseId._id;
          courseId = String(courseId);
          counts[courseId] = (counts[courseId] || 0) + 1;
        });
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

  // Apply filters and pagination
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
    if (categoryFilter)
      temp = temp.filter((c) => c.category?.name === categoryFilter);
    if (instructorFilter)
      temp = temp.filter((c) => c.instructor?.name === instructorFilter);
    if (approvalFilter)
      temp = temp.filter((c) => c.approval === approvalFilter);
    if (statusFilter) temp = temp.filter((c) => c.status === statusFilter);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    setFilteredCourses(temp.slice(start, end));
  }, [
    courses,
    search,
    categoryFilter,
    instructorFilter,
    approvalFilter,
    statusFilter,
    perPage,
    currentPage,
  ]);

  const totalPages = Math.ceil(
    courses.filter((c) => {
      let match = true;
      if (search)
        match =
          match &&
          (c.title?.toLowerCase().includes(search.toLowerCase()) ||
            c.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
            c.instructor?.name?.toLowerCase().includes(search.toLowerCase()));
      if (categoryFilter) match = match && c.category?.name === categoryFilter;
      if (instructorFilter)
        match = match && c.instructor?.name === instructorFilter;
      if (approvalFilter) match = match && c.approval === approvalFilter;
      if (statusFilter) match = match && c.status === statusFilter;
      return match;
    }).length / perPage
  );

  const handleUpdateCourseStatus = async (courseId, data) => {
    console.log({ id: courseId, status: data });
    try {
      const res = await updateCourse({ id: courseId, status: data }).unwrap();
      if (!!res?.success) {
        toast.success(res?.message);
      }
      console.log("res", res);
    } catch (error) {
      console.log("update error", error);
    }
  };
const handleDeleteCourse = async (courseId) => {
  try {
    // 1️⃣ প্রথমে confirmation popup দেখানো হলো
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // 2️⃣ যদি ইউজার confirm করে
    if (result.isConfirmed) {
      const res = await deleteCourse(courseId).unwrap(); // ✅ async await ইউজ করা হলো

      if (res?.success) {
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    }
  } catch (error) {
    console.log("delete error", error);
    Swal.fire({
      title: "Error!",
      text: "Something went wrong while deleting.",
      icon: "error",
    });
  }
};


  const handleEdit = (course) => console.log("Edit clicked:", course.title);
  const handleDelete = (course) => console.log("Delete clicked:", course.title);

  if (loading)
    return <div className="p-6 text-center">⏳ Loading courses...</div>;
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
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
          value={instructorFilter}
          onChange={(e) => setInstructorFilter(e.target.value)}
        >
          <option value="">All Instructors</option>
          {instructorNames.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
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
          className="p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
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
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <tr>
              {[
                "SN",
                "Course Name",
                "Instructor",
                "Price",
                "Students",
                "Created",
                "Course Type",
                "Status",
                "Approval",
                "Actions",
              ].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, i) => (
              <tr
                key={i}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">
                  {(currentPage - 1) * perPage + i + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {course.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {course.category?.name}
                  </div>
                </td>
                <td className="px-4 py-3">{course.instructor?.name}</td>
                <td className="px-4 py-3">৳ {course.price}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/course-students/${course._id}`}
                    className="text-blue-600 text-sm underline"
                  >
                    {enrollCounts[String(course._id)] ?? 0}
                  </Link>
                </td>
                <td className="px-4 py-3">{formatDate(course.createdAt)}</td>
                <td className="px-4 py-3">{course?.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white ${
                      statusColors[course.status] || "bg-gray-500"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={course.status}
                    className="p-1 border rounded text-sm dark:bg-gray-900 dark:text-white"
                    onChange={(e) =>
                      handleUpdateCourseStatus(course?._id, e.target.value)
                    }
                  >
                    <option value="upcoming">UPCOMING</option>
                    <option value={"published"}>PUBLISHED</option>
                    <option value={"unPublished"}>UNPUBLISHED</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Link to={`/dashboard/edit-course/${course.id}`}>
                      <button
                        onClick={() => handleEdit(course)}
                        className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
                      >
                        <FiEdit className="mr-1" /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteCourse(course?._id)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center space-x-2 mt-4">
          <button
            className="px-3 py-1  rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          ></button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1   rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
