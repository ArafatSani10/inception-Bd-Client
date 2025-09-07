import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CourseStudents = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        // Fetch course info
        const courseRes = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}`);
        setCourseTitle(courseRes.data.title || "Course");

        // Fetch orders for this course
        const ordersRes = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        const enrolledOrders = (ordersRes.data.data || []).filter(
          (order) => String(order.course?._id || order.course) === courseId
        );

        // Extract user info
        const users = enrolledOrders.map((o) => o.user); // Make sure backend returns user info
        setStudents(users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  if (loading) return <div className="p-6 text-center">⏳ Loading students...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#00baff]">{courseTitle} - Enrolled Students</h1>
        <Link to="/dashboard/courses" className="text-blue-600 hover:underline">
          ← Back to Courses
        </Link>
      </div>

      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {students.map((user, i) => (
              <tr
                key={i}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{user?.name || "Unknown"}</td>
                <td className="px-4 py-3">{user?.email || "-"}</td>
                <td className="px-4 py-3">{user?.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseStudents;
