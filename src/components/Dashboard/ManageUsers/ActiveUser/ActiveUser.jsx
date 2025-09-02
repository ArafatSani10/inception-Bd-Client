import React, { useState, useEffect } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ActiveUser = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('Latest');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All'); // 🔥 নতুন যোগ করা হয়েছে

    // Fetch active users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                const activeUsers = res.data.data.filter(user => user.status === 'active');
                setUsers(activeUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    // Filter, search & sort
    useEffect(() => {
        let tempUsers = [...users];

        // Role filter
        if (roleFilter !== 'All') {
            tempUsers = tempUsers.filter(user => user.role === roleFilter.toLowerCase());
        }

        // Search filter
        if (searchTerm) {
            tempUsers = tempUsers.filter(
                user =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Order By
        tempUsers.sort((a, b) => {
            if (orderBy === 'Latest') {
                return new Date(b.createdAt) - new Date(a.createdAt); // নতুন আগে
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt); // পুরনো আগে
            }
        });

        setFilteredUsers(tempUsers);
        setCurrentPage(1); // search/order/filter change হলে page reset
    }, [users, orderBy, searchTerm, roleFilter]);

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
            <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-md">
                <h1 className="text-xl font-bold pb-2 mb-4 text-[#00baff]">Active Users</h1>

                {/* Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    {/* Order By */}
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="Latest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>

                    {/* Per Page */}
                    <select
                        value={usersPerPage}
                        onChange={(e) => setUsersPerPage(Number(e.target.value))}
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                    </select>

                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="All">All Roles</option>
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
                    </select>
                </div>

                {/* User Table */}
                {/* User Table */}
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-transparent">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-white">
                                <th className="py-3 px-4">SN</th>

                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Joined at</th>
                                <th className="py-3 px-4">{users.role}ID</th> {/* NEW COLUMN */}
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-transparent space-y-4">
                            {currentUsers.map((user, index) => (
                                <tr
                                    key={user._id || index}
                                    className="text-sm rounded-md bg-white dark:bg-gray-800 shadow-sm"
                                >
                                    <td className="py-3 px-4">{indexOfFirstUser + index + 1}</td>

                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.phone || 'N/A'}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white capitalize">
                                            {user.role || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{new Date(user.createdAt).toLocaleString()}</td>
                                    <td className="py-3 px-4 text-sm break-all">{user.id}</td> {/* NEW COLUMN DATA */}
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-white">
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 space-x-2">
                                        <Link to={`/dashboard/active-update/${user._id}`}>
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
                            onClick={() => setCurrentPage(num)}
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

export default ActiveUser;
