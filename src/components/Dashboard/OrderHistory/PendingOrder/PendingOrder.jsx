import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router';

const PendingOrder = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
            {/* Top Section with Search */}
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mb-6">
                <div className="col-span-1 lg:col-span-3">
                    <h1 className="text-xl font-semibold text-[#00baff]">Pending Orders</h1>
                </div> 
                <div className="col-span-1">
                    <input
                        type="text"
                        placeholder="Search order..."
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase">
                        <tr>
                            <th className="px-6 py-3">SN</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Paid Amount</th>
                            <th className="px-6 py-3">Gateway</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Payment</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Example row */}
                        <tr>
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4">John Doe</td>
                            <td className="px-6 py-4">#ODR12345</td>
                            <td className="px-6 py-4">৳1200</td>
                            <td className="px-6 py-4">SSLCommerz</td>
                            <td className="px-6 py-4">
                                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Pending</span>
                            </td>
                            <td className="px-6 py-4">Unpaid</td>
                            <td className="px-6 py-4 flex items-center space-x-3">
                             <Link to="/dashboard/invoice">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FiEdit size={18} />
                                </button>
                             </Link>
                                <button className="text-red-500 hover:text-red-700">
                                    <FiTrash2 size={18} />
                                </button>
                            </td>
                        </tr>

                        {/* Add more rows dynamically here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingOrder;
