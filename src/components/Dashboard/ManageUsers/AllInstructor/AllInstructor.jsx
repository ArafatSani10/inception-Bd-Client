import React, { useState } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router';

const usersData = [
    {
        id: 1,
        name: 'Md Ridoy Hossain',
        email: 'ridoyhossain@gmail.com',
        joinedAt: '11:14AM, 07 Aug 2025',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Boktiar Ahmed Bappy',
        email: 'bappy@gmail.com',
        joinedAt: '10:25PM, 06 Aug 2025',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Md.Maruf Hossain',
        email: 'maruf@gmail.com',
        joinedAt: '08:25PM, 06 Aug 2025',
        status: 'Not verified',
    },
    
    // Add more users as needed...
];

const AllInstructor = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(usersData.length / usersPerPage);

    const handlePageChange = (num) => {
        if (typeof num === 'number') {
            setCurrentPage(num);
        }
    };

    return (
        <div className="p-4 md:p-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
            <div className="bg-white dark:bg-gray-800 p-4 space-y-10 shadow rounded-md">
                <h1 className="text-xl font-bold pb-2 mb-4 text-[#00baff]">All Instructor</h1>

                {/* Filter Bar */} 
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <select className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Select Verified</option>
                        <option>Verified</option>
                        <option>Not Verified</option>
                    </select>
                    <select className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Select Banned</option>
                        <option>Banned</option>
                        <option>Not Banned</option>
                    </select>
                    <select className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Order By</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                    <select className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option>Per Page</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto mt-4 ">
                    <table className="min-w-full bg-transparent">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-white">
                                <th className="py-3 px-4">SN</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Joined at</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-transparent space-y-4">
                            {currentUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="text-sm rounded-md bg-white dark:bg-gray-800 shadow-sm"
                                >
                                    <td className="py-3 px-4">{indexOfFirstUser + index + 1}</td>
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.joinedAt}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-white'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white'
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 space-x-2">
                                       <Link to="/dashboard/instructor-updated">
                                        <button className="text-blue-600 dark:text-blue-400 hover:underline">
                                            <FiEye />
                                        </button>
                                       </Link>
                                        <button className="text-red-600 dark:text-red-400 hover:underline">
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Pagination */}
                <div className="flex justify-end items-center mt-4 space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => handlePageChange(num)}
                            className={`px-3 py-1 border rounded ${currentPage === num
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllInstructor;
