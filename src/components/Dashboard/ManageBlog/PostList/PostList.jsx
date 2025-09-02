import React, { useState, useEffect } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const usersPerPage = 5;


  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        // assuming API returns { data: [...] }
        setData(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(data.length / usersPerPage);

  const handlePageChange = (num) => {
    if (typeof num === 'number') setCurrentPage(num);
  };

  const toggleStatus = (id) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-md">
        {/* Header */}
        <div className="shadow p-4 rounded-lg mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-xl font-semibold text-[#00baff]">Blog List</h1>
          <Link to="/dashboard/admin-home" className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold">Dashboard</span> / Post List
          </Link>
        </div>

        {/* Add Button */}
        <div className="mb-4 flex items-center justify-end">
          <Link to="/dashboard/create-post">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
              + Add New
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold">
                <th className="py-3 px-4">SN</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Joined At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.map((user, index) => (
                <tr
                  key={user._id || user.id}
                  className="text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-4">{indexOfFirstUser + index + 1}</td>
                  <td className="py-3 px-4">{user.title}</td>
                  <td className="py-3 px-4">{user.category?.name}</td>
                  <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.status === 'Active'}
                        onChange={() => toggleStatus(user.id || user._id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500 transition-colors"></div>
                      <span
                        className={`absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-transform ${user.status === 'Active' ? 'translate-x-full' : ''
                          }`}
                      ></span>
                    </label>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <Link to={`/dashboard/post-update/${user.id || user._id}`}>
                      <button className="text-blue-600 dark:text-blue-400 hover:scale-110 transition">
                        <FiEye size={20} />
                      </button>
                    </Link>
                    <button className="text-red-600 dark:text-red-400 hover:scale-110 transition">
                      <FiTrash2 size={20} />
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
              className={`px-3 py-1 border rounded transition ${currentPage === num
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

export default PostList;
