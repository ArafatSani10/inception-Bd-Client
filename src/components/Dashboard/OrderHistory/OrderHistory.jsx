import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router';

const OrderHistory = () => {
    const orders = [
        { user: 'Rupok', orderId: '#D56D0K2', paidAmount: '999 BDT', gateway: 'Bank', status: 'complete', payment: 'create' },
        { user: 'Rupok', orderId: '#H4Ld7NbCt', paidAmount: '0 BDT', gateway: 'Free', status: 'complete', payment: 'use' },
        { user: 'WebX cloud', orderId: '#R6uFx0A74', paidAmount: '15000 BDT', gateway: 'Bank', status: 'complete', payment: 'use' },
        { user: 'WebX cloud', orderId: '#4exK22RBU', paidAmount: '999 BDT', gateway: 'Bank', status: 'complete', payment: 'use' },
        { user: 'WebX cloud', orderId: '#AwkJ2YNbWt', paidAmount: '0 BDT', gateway: 'Free', status: 'complete', payment: 'use' },
        { user: 'sm Ovi', orderId: '#nG3Wpy8Lw9', paidAmount: '0 BDT', gateway: 'Free', status: 'complete', payment: 'use' },
        { user: 'M4HAMMAD MOHSH UDDIN', orderId: '#OL7w4eICG', paidAmount: '999 BDT', gateway: 'Bank', status: 'complete', payment: 'use' },
        { user: 'Fabad Proroth', orderId: '#MX0C1aLZr', paidAmount: '15000 BDT', gateway: 'Bank', status: 'complete', payment: 'use' },
        { user: 'Mobed Hasan', orderId: '#IL5Yhgb/b', paidAmount: '15000 BDT', gateway: 'Bank', status: 'complete', payment: 'use' },
        { user: 'Mobed Hasan', orderId: '#cZpP5sTD3', paidAmount: '999 BDT', gateway: 'Bank', status: 'complete', payment: 'use' },
    ];

    return (
        <div className="p-4 text-gray-800 dark:text-gray-100">
            <h1 className="font-bold text-xl p-2 text-[#00baff]">Order History</h1>


            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                    {/* Order Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Order status
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>All Status</option>
                            <option>Complete</option>
                            <option>Pending</option>
                        </select>
                    </div>

                    {/* Payment Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Payment Status
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>All Payments</option>
                            <option>Paid</option>
                            <option>Unpaid</option>
                        </select>
                    </div>

                    {/* Order By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Order By
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    {/* Per Page */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Per Page
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>

                    {/* Search Input */}
                    <div className="relative col-span-1 xl:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Search
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                   
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {['SN', 'User', 'Order Id', 'Paid Amount', 'Gateway', 'Status', 'Payment', 'Action'].map((head, i) => (
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
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{order.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">{order.orderId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{order.paidAmount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.gateway}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.payment}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex gap-3">
                                  <Link to="/dashboard/invoice">
                                    <button title="Edit" className="hover:text-blue-600 dark:hover:text-blue-400">
                                        <FiEdit />
                                    </button>
                                  </Link>
                                    <button title="Delete" className="hover:text-red-600 dark:hover:text-red-400">
                                        <FiTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
