import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [paymentFilter, setPaymentFilter] = useState("All Payments");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
                console.log("API response:", res.data);

                const ordersArray = Array.isArray(res.data.orders)
                    ? res.data.orders
                    : Array.isArray(res.data.data)
                        ? res.data.data
                        : Array.isArray(res.data)
                            ? res.data
                            : [];

                setOrders(ordersArray);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${orderId}`);
            setOrders((prev) => prev.filter((order) => order.id !== orderId));
        } catch (err) {
            console.error("Error deleting order:", err);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesStatus =
            statusFilter === "All Status" ||
            (order.status && order.status.toLowerCase() === statusFilter.toLowerCase());
        const matchesPayment =
            paymentFilter === "All Payments" ||
            (order.payment && order.payment.toLowerCase() === paymentFilter.toLowerCase());
        const matchesSearch =
            searchQuery === "" ||
            (order.user?.email && order.user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (order.id && order.id.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesPayment && matchesSearch;
    });

    return (
        <div className="p-4 text-gray-800 dark:text-gray-100">
            <h1 className="font-bold text-xl p-2 text-[#00baff]">Order History</h1>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100"
                        >
                            <option>All Status</option>
                            <option>Complete</option>
                            <option>Pending</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Status</label>
                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100"
                        >
                            <option>All Payments</option>
                            <option>Paid</option>
                            <option>Unpaid</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order By</label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Per Page</label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>

                    <div className="relative col-span-1 xl:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by email or order ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {["SN", "User", "Order Id", "Paid Amount", "Gateway", "Status", "enroll date",  "Action"].map((head, i) => (
                                <th
                                    key={i}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500 dark:text-gray-300">
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500 dark:text-gray-300">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order, index) => (
                                <tr key={order.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{order.user?.email || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">{order.id || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">৳{order.amount || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.gateway || "SSLCommerz"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status?.toLowerCase() === "complete"
                                                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                                                }`}
                                        >
                                            {order.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleString("en-BD", {
                                                weekday: "short",   // e.g., Mon
                                                year: "numeric",
                                                month: "short",     // e.g., Sep
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "N/A"}
                                    </td>


                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.payment || "Unpaid"}</td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex gap-3">
                                        <Link to={`/dashboard/invoice/${order.id}`}>
                                            <button title="Edit" className="hover:text-blue-600 dark:hover:text-blue-400">
                                                <FiEdit />
                                            </button>
                                        </Link>
                                        <button
                                            title="Delete"
                                            onClick={() => handleDelete(order.id)}
                                            className="hover:text-red-600 dark:hover:text-red-400"
                                        >
                                            <FiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
