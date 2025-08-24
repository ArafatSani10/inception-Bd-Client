import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router';

const WithdrawMethod = () => {
    return (
        <div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <div className='font-bold mb-6 text-[#00baff]'>
                    <h1>Withdraw-Method</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {/* Order Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Order status
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-gray-100">
                            <option>Select Status</option>
                            <option>Active</option>
                            <option>InActive</option>
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
                    <div className="relative ">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Search
                        </label>
                        <div className="">
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

            <Link to="/dashboard/create-method">   <div className='flex items-center justify-end'>
                <button className='p-3  border-none  mb-3  rounded-xl bg-[#00baff] text-white md:'>Add New</button>
            </div></Link>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase">
                        <tr>
                            <th className="px-6 py-3">SN</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Minimum Amount</th>
                            <th className="px-6 py-3">Maximum Amount</th>
                            <th className="px-6 py-3">Status</th>

                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Example row */}
                        <tr>
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4">Bkash Personal</td>

                            <td className="px-6 py-4">৳1200</td>
                            <td className="px-6 py-4">৳12000</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                                    Active
                                </span>
                            </td>

                            <td className="px-6 py-4 flex items-center space-x-3">
                               <Link to="/dashboard/update-method">
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

export default WithdrawMethod;