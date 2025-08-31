import React, { useState, useEffect } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllInstructor = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('Latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const base_url = 'http://localhost:5000/api/v1'; // API base URL

  // Fetch instructors
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${base_url}/users`);
        const instructors = res.data.data.filter(user => user.role === 'instructor');
        setUsers(instructors);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter, search & sort
  useEffect(() => {
    let tempUsers = [...users];

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
        return new Date(b.createdAt) - new Date(a.createdAt); // নতুন join আগে
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt); // পুরনো join আগে
      }
    });

    setFilteredUsers(tempUsers);
    setCurrentPage(1); // search/order change হলে page reset
  }, [users, orderBy, searchTerm]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (num) => setCurrentPage(num);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-32 h-32 bg-blue-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <div className="bg-white dark:bg-gray-800 p-6 space-y-6 shadow-xl rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#00baff]">All Instructors</h1>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <select
            value={usersPerPage}
            onChange={(e) => setUsersPerPage(Number(e.target.value))}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        {/* User Table */}
     {/* User Table */}
<div className="overflow-x-auto">
  <table className="min-w-full table-auto bg-transparent">
    <thead>
      <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-white">
        <th className="py-3 px-4">SN</th>
     
        <th className="py-3 px-4">Name</th>
        <th className="py-3 px-4">Email</th>
        <th className="py-3 px-4">Phone Number</th>
        <th className="py-3 px-4">Joined at</th>
           <th className="py-3 px-4">InstrucorID</th> {/* NEW COLUMN */}
        <th className="py-3 px-4">Status</th>
        <th className="py-3 px-4">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {currentUsers.map((user, idx) => (
        <tr key={user._id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-all rounded-md">
          <td className="py-3 px-4">{indexOfFirstUser + idx + 1}</td>
      
          <td className="py-3 px-4">{user.name}</td>
          <td className="py-3 px-4">{user.email}</td>
          <td className="py-3 px-4">{user.phone || 'N/A'}</td>
          <td className="py-3 px-4">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="py-3 px-4 text-sm break-all">{user.id}</td> {/* NEW COLUMN DATA */}
          <td className="py-3 px-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.status === 'Active'
                ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-white'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white'
            }`}>
              {user.status}
            </span>
          </td>
          <td className="py-3 px-4 flex gap-2">
            <Link to={`/dashboard/instructor-view/${user.id}`}>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 transition">
                <FiEye />
              </button>
            </Link>
            <button className="text-red-600 dark:text-red-400 hover:text-red-500 transition">
              <FiTrash2 />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Pagination */}
        <div className="flex justify-end mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 rounded-md font-medium ${
                currentPage === num
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
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
