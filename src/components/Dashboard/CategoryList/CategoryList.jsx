import React, { useState } from 'react';
import { FaEdit, FaList, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const initialCategories = [
  {
    id: 1,
    icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061009.png',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    showAtTrading: true,
    status: 'Active',
  },
  {
    id: 2,
    icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061017.png',
    name: 'Graphics Design',
    slug: 'graphics-design',
    showAtTrading: true,
    status: 'Active',
  },
  {
    id: 3,
    icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061007.png',
    name: 'Learn SEO',
    slug: 'learn-seo',
    showAtTrading: true,
    status: 'Active',
  },
  {
    id: 4,
    icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061023.png',
    name: 'Laravel Learning',
    slug: 'laravel-learning',
    showAtTrading: true,
    status: 'Active',
  },
];

const CategoryList = () => {
  const [categories, setCategories] = useState(initialCategories);

  const toggleStatus = (id) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' } : cat
    );
    setCategories(updated);
  };

  return (
    <div className="p-4 md:p-6 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00baff]">Category List</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border dark:border-gray-700 dark:bg-gray-700 dark:placeholder-gray-300 dark:text-white rounded px-4 py-2 w-full"
          />
          <select className="border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 w-full">
            <option>Select Status</option>
          </select>
          <select className="border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 w-full">
            <option>Order By</option>
          </select>
          <select className="border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 w-full">
            <option>Per Page</option>
          </select>
        </div>

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-lg font-medium">Categories</h1>
          <Link to='/dashboard/add-category'>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto">
              + Add New
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow overflow-x-auto">
        <table className="min-w-[700px] w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm">
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">Icon</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Show at Trading</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="border-t border-gray-200 dark:border-gray-700 text-sm">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img src={cat.icon} alt={cat.name} className="w-10 h-10 object-contain" />
                </td>
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3">{cat.slug}</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 dark:bg-green-600 dark:text-white text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm">
                    Yes
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(cat.id)}
                    className={`px-4 py-1 rounded-full shadow text-white text-xs sm:text-sm transition duration-200 ${cat.status === 'Active'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                  >
                    {cat.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">

                
                      <Link to="/dashboard/update-category">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                        <FaEdit />
                      </button>
                      </Link>
             
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                      <FaList />
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
