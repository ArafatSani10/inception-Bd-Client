import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router';

const WithdrawList = () => {
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
            {/* Filter Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
                <div className='flex items-center justify-between'>
                    <div className="font-bold mb-6 text-lg text-[#00baff]">
                        <h1>Withdraw List</h1>
                    </div>


                    <div className='mb-6  '>
                    <Link to="/dashboard/admin-home">    <span className='text-[#00baff]'>Dashboard</span></Link>
                        <span className='px-3'>WithdrawList</span>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Order Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Order Status
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>Select Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    {/* Order By */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Order By
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    {/* Per Page */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Per Page
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Search
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Table Section */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 ">
                        <tr>
                            <th className="px-6 py-3">SN</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Method</th>
                            <th className="px-6 py-3">Current Balance</th>
                            <th className="px-6 py-3">Withdraw Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Example Row */}
                        <tr>
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4">John Doe</td>
                            <td className="px-6 py-4">Bkash</td>
                            <td className="px-6 py-4">৳5000</td>
                            <td className="px-6 py-4">৳1500</td>
                            <td className="px-6 py-4">
                                <span className="text-yellow-600 dark:text-yellow-400 font-medium">Pending</span>
                            </td>
                            <td className="px-6 py-4">2025-08-07</td>
                            <td className="px-6 py-4 flex space-x-3">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FiEdit size={18} />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <FiTrash2 size={18} />
                                </button>
                            </td>
                        </tr>
                        {/* Map your data here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WithdrawList;
