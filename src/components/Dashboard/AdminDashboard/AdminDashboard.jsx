// import React, { useState } from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";
// import RecentUpdates from "./RecentUpdates/RecentUpdates";




// // Sample multi-year data
// const salesData = [
//     { year: 2023, month: "Jan", sales: 25 },
//     { year: 2023, month: "Feb", sales: 30 },
//     { year: 2023, month: "Mar", sales: 28 },
//     { year: 2023, month: "Apr", sales: 35 },
//     { year: 2023, month: "May", sales: 40 },
//     { year: 2023, month: "Jun", sales: 38 },
//     { year: 2023, month: "Jul", sales: 45 },
//     { year: 2023, month: "Aug", sales: 42 },
//     { year: 2023, month: "Sep", sales: 48 },
//     { year: 2023, month: "Oct", sales: 52 },
//     { year: 2023, month: "Nov", sales: 55 },
//     { year: 2023, month: "Dec", sales: 60 },

//     { year: 2024, month: "Jan", sales: 30 },
//     { year: 2024, month: "Feb", sales: 45 },
//     { year: 2024, month: "Mar", sales: 40 },
//     { year: 2024, month: "Apr", sales: 55 },
//     { year: 2024, month: "May", sales: 60 },
//     { year: 2024, month: "Jun", sales: 50 },
//     { year: 2024, month: "Jul", sales: 70 },
//     { year: 2024, month: "Aug", sales: 65 },
//     { year: 2024, month: "Sep", sales: 60 },
//     { year: 2024, month: "Oct", sales: 75 },
//     { year: 2024, month: "Nov", sales: 80 },
//     { year: 2024, month: "Dec", sales: 90 },
// ];

// const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// const AdminDashboard = () => {
//     const [selectedYear, setSelectedYear] = useState(2024);
//     const [selectedMonth, setSelectedMonth] = useState("All");

//     const years = [...new Set(salesData.map(item => item.year))];

//     const filteredData = salesData.filter(item =>
//         item.year === parseInt(selectedYear) &&
//         (selectedMonth === "All" || item.month === selectedMonth)
//     );

//     const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);

//     return (
//         <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 space-y-8">
//             {/* Top Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {[
//                     { label: "Total Order", value: "17" },
//                     { label: "Total Courses", value: "9" },
//                     { label: "Total Earnings", value: "৳0.00" },
//                     { label: "Total Enrollment", value: "23" },
//                     { label: "Total Instructor", value: "23" },
//                     { label: "Total Student", value: "23" },
//                     { label: "Completed Tasks", value: "23" },
//                     { label: "Completed Tasks", value: "23" },
//                 ].map((card, idx) => (
//                     <div
//                         key={idx}
//                         className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
//                     >
//                         <div className="bg-indigo-500 p-4 rounded-lg text-white text-2xl flex justify-center items-center">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-8 w-8"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={2}
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M5 13l4 4L19 7"
//                                 />
//                             </svg>
//                         </div>
//                         <div>
//                             <p className="text-gray-600 dark:text-gray-400 text-sm">{card.label}</p>
//                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h2>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="bg-gray-50 dark:bg-gray-900   space-y-8">

//                 {/* Sales Chart with Filters */}
//                 <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 max-w-full mx-auto">
//                     {/* Filter Section */}
//                     <div className="flex flex-col md:flex-row justify-between md:items-center mb-5 gap-4">
//                         <div className="flex flex-wrap gap-4 items-center">
//                             <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Sales Overview</h2>

//                             <select
//                                 value={selectedYear}
//                                 onChange={(e) => setSelectedYear(e.target.value)}
//                                 className="px-2

// py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
//                             >
//                                 {years.map((year) => (
//                                     <option key={year} value={year}>{year}</option>
//                                 ))}
//                             </select>

//                             <select
//                                 value={selectedMonth}
//                                 onChange={(e) => setSelectedMonth(e.target.value)}
//                                 className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
//                             >
//                                 <option value="All">All Months</option>
//                                 {months.map((month) => (
//                                     <option key={month} value={month}>{month}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
//                             <span><strong>Total Sales:</strong> {totalSales}</span>
//                             {selectedMonth !== "All" && (
//                                 <span><strong>{selectedMonth} Sales:</strong> {filteredData[0]?.sales || 0}</span>
//                             )}
//                         </div>
//                     </div>

//                     {/* Chart Section */}
//                     <div className="h-72 w-full">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <LineChart
//                                 data={filteredData}
//                                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                             >
//                                 <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
//                                 <XAxis
//                                     dataKey="month"
//                                     stroke="#64748b"
//                                     tick={{ fontWeight: "600" }}
//                                 />
//                                 <YAxis stroke="#64748b" allowDecimals={false} />
//                                 <Tooltip
//                                     contentStyle={{
//                                         backgroundColor: "#1e293b",
//                                         borderRadius: 8,
//                                         border: "none",
//                                     }}
//                                     itemStyle={{ color: "#60a5fa" }}
//                                     formatter={(value) => `${value} sales`}
//                                 />
//                                 <Line
//                                     type="monotone"
//                                     dataKey="sales"
//                                     stroke="#3b82f6"
//                                     strokeWidth={3}
//                                     dot={{ r: 5, strokeWidth: 2, fill: "#2563eb" }}
//                                     activeDot={{ r: 7 }}
//                                     animationDuration={1500}
//                                 />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 {/* recend update */}
//                 <RecentUpdates></RecentUpdates>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RecentUpdates from "./RecentUpdates/RecentUpdates";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [ordersRes, coursesRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/orders`),
          axios.get(`${import.meta.env.VITE_API_URL}/courses`),
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
        ]);

        // Orders
        const ordersArray = Array.isArray(ordersRes.data.orders)
          ? ordersRes.data.orders
          : Array.isArray(ordersRes.data.data)
          ? ordersRes.data.data
          : Array.isArray(ordersRes.data)
          ? ordersRes.data
          : [];
        setOrders(ordersArray);

        // Courses
        const coursesArray = Array.isArray(coursesRes.data.courses)
          ? coursesRes.data.courses
          : Array.isArray(coursesRes.data.data)
          ? coursesRes.data.data
          : Array.isArray(coursesRes.data)
          ? coursesRes.data
          : [];
        setCourses(coursesArray);

        // Users
        const usersArray = Array.isArray(usersRes.data.users)
          ? usersRes.data.users
          : Array.isArray(usersRes.data.data)
          ? usersRes.data.data
          : Array.isArray(usersRes.data)
          ? usersRes.data
          : [];
        setUsers(usersArray);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Derived data
  const totalOrders = orders.length;
  const totalCourses = courses.length;
  const totalStudents = users.filter(u => u.role === "student").length;
  const totalInstructors = users.filter(u => u.role === "instructor").length;
  const totalEarnings = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

  // Chart data: monthly sales
  const salesData = months.map(month => {
    const monthOrders = orders.filter(order => {
      const date = new Date(order.createdAt);
      return (
        date.getFullYear() === parseInt(selectedYear) &&
        (selectedMonth === "All" || months[date.getMonth()] === selectedMonth)
      );
    });
    return {
      month,
      sales: monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0),
    };
  });

  const totalSales = salesData.reduce((sum, m) => sum + m.sales, 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Enrollments", value: totalOrders },
          { label: "Total Courses", value: totalCourses },
          { label: "Total Students", value: totalStudents },
          { label: "Total Instructors", value: totalInstructors },
          { label: "Total Earnings", value: `৳${totalEarnings}` },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
          >
            <div className="bg-indigo-500 p-4 rounded-lg text-white text-2xl flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{card.label}</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 max-w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-5 gap-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Sales Overview</h2>
          <div className="flex gap-4 items-center">
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
            >
              {[...new Set(orders.map(o => new Date(o.createdAt).getFullYear()))].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
            >
              <option value="All">All Months</option>
              {months.map(month => <option key={month} value={month}>{month}</option>)}
            </select>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontWeight: "600" }} />
              <YAxis stroke="#64748b" allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", borderRadius: 8, border: "none" }}
                itemStyle={{ color: "#60a5fa" }}
                formatter={value => `৳${value}`}
              />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, fill: "#2563eb" }} activeDot={{ r: 7 }} animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Updates */}
      <RecentUpdates />
    </div>
  );
};

export default AdminDashboard;
