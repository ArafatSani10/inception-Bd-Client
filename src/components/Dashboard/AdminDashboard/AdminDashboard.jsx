import React, { useState } from "react";
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




// Sample multi-year data
const salesData = [
    { year: 2023, month: "Jan", sales: 25 },
    { year: 2023, month: "Feb", sales: 30 },
    { year: 2023, month: "Mar", sales: 28 },
    { year: 2023, month: "Apr", sales: 35 },
    { year: 2023, month: "May", sales: 40 },
    { year: 2023, month: "Jun", sales: 38 },
    { year: 2023, month: "Jul", sales: 45 },
    { year: 2023, month: "Aug", sales: 42 },
    { year: 2023, month: "Sep", sales: 48 },
    { year: 2023, month: "Oct", sales: 52 },
    { year: 2023, month: "Nov", sales: 55 },
    { year: 2023, month: "Dec", sales: 60 },

    { year: 2024, month: "Jan", sales: 30 },
    { year: 2024, month: "Feb", sales: 45 },
    { year: 2024, month: "Mar", sales: 40 },
    { year: 2024, month: "Apr", sales: 55 },
    { year: 2024, month: "May", sales: 60 },
    { year: 2024, month: "Jun", sales: 50 },
    { year: 2024, month: "Jul", sales: 70 },
    { year: 2024, month: "Aug", sales: 65 },
    { year: 2024, month: "Sep", sales: 60 },
    { year: 2024, month: "Oct", sales: 75 },
    { year: 2024, month: "Nov", sales: 80 },
    { year: 2024, month: "Dec", sales: 90 },
];

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const AdminDashboard = () => {
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState("All");

    const years = [...new Set(salesData.map(item => item.year))];

    const filteredData = salesData.filter(item =>
        item.year === parseInt(selectedYear) &&
        (selectedMonth === "All" || item.month === selectedMonth)
    );

    const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 space-y-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Order", value: "17" },
                    { label: "Total Courses", value: "9" },
                    { label: "Total Earnings", value: "৳0.00" },
                    { label: "Completed Tasks", value: "23" },
                    { label: "Completed Tasks", value: "23" },
                    { label: "Completed Tasks", value: "23" },
                    { label: "Completed Tasks", value: "23" },
                    { label: "Completed Tasks", value: "23" },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{card.label}</p>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen  space-y-8">

                {/* Sales Chart with Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-full mx-auto">
                    {/* Filter Section */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-5 gap-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Sales Overview</h2>

                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>

                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
                            >
                                <option value="All">All Months</option>
                                {months.map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
                            <span><strong>Total Sales:</strong> {totalSales}</span>
                            {selectedMonth !== "All" && (
                                <span><strong>{selectedMonth} Sales:</strong> {filteredData[0]?.sales || 0}</span>
                            )}
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={filteredData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#64748b"
                                    tick={{ fontWeight: "600" }}
                                />
                                <YAxis stroke="#64748b" allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1e293b",
                                        borderRadius: 8,
                                        border: "none",
                                    }}
                                    itemStyle={{ color: "#60a5fa" }}
                                    formatter={(value) => `${value} sales`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ r: 5, strokeWidth: 2, fill: "#2563eb" }}
                                    activeDot={{ r: 7 }}
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* recend update */}
                <RecentUpdates></RecentUpdates>
            </div>
        </div>
    );
};

export default AdminDashboard;
