import React, { useState } from "react";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";

const courses = [
  {
    title: "Gemerative AI course in Bangla",
    category: "Custom Design",
    instructor: "Boktiar Ahmed Bappy",
    price: "৳800",
    students: 0,
    created: "06 Aug, 2025 20:34",
    updated: "06 Aug, 2025 20:34",
    status: "draft",
    approval: "Pending",
  },
  {
    title: "Phython live course for begginers",
    category: "Custom Design",
    instructor: "Md Ridoy Hossain",
    price: "৳100.00",
    students: 0,
    created: "06 Aug, 2025 19:19",
    updated: "06 Aug, 2025 19:20",
    status: "draft",
    approval: "Pending",
  },
  {
    title: "Web Developement",
    category: "Custom Design",
    instructor: "Md Maruf Hossain",
    price: "100.09",
    students: 3,
    created: "29 Jul, 2025 15:21",
    updated: "01 Aug, 2025 11:42",
    status: "Published",
    approval: "Approved",
  },
];

const statusColors = {
  draft: "bg-yellow-400",
  Published: "bg-green-500",
};

const CourseList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleEdit = (course) => {
    console.log("Edit clicked:", course.title);
  };

  const handleDelete = (course) => {
    console.log("Delete clicked:", course.title);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 text-2xl font-bold text-[#00baff]">
        Courses
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Search"
          className="col-span-1 md:col-span-1 p-2 border rounded dark:bg-gray-900 dark:text-white"
        />
        <input
          type="date"
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
        />
        <input
          type="Category"
          placeholder="Category"
          className="p-2 border rounded dark:bg-gray-900 dark:text-white"
        />
        <select className="p-2 border rounded dark:bg-gray-900 dark:text-white">
          <option disabled selected>
            Instructor
          </option>
          <option>Md Ridoy Hossain</option>
          <option>Md Maruf Hossain</option>
          <option>Boktiar Ahmed Bappy </option>
        </select>
        <select className="p-2 border rounded dark:bg-gray-900 dark:text-white">
          <option disabled selected>
            Approval Status
          </option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected </option>
        </select>
        <select className="p-2 border rounded dark:bg-gray-900 dark:text-white">
          <option disabled selected>
            Status
          </option>
          <option>Published</option>
          <option>Unpublished</option>
          <option>Drafted </option>
        </select>
        <select className="p-2 border rounded dark:bg-gray-900 dark:text-white">
          <option disabled selected>
            Order By
          </option>
          <option>ASC</option>
          <option>DESC</option>
        </select>
        <select className="p-2 border rounded dark:bg-gray-900 dark:text-white">
          <option disabled selected>
            Per Page
          </option>
          <option>10</option>
          <option>50</option>
          <option>100</option>
        </select>
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
            {courses.map((course, i) => (
              <tr key={i} className="border-t dark:border-gray-700">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-500">{course.category}</div>
                </td>
                <td className="px-4 py-3">{course.instructor}</td>
                <td className="px-4 py-3">{course.price}</td>
                <td className="px-4 py-3">{course.students}</td>
                <td className="px-4 py-3">{course.created}</td>
                <td className="px-4 py-3">{course.updated}</td>
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
                  </select>
                </td>
                <td className="px-4 py-3 relative">
                  <button
                    className="text-blue-600 dark:text-blue-400"
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
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
