import React, { useState, useEffect } from 'react';
import { FaEdit, FaList, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & sorting
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [order, setOrder] = useState('asc'); // or 'desc'
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/categories');
        setCategories(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err.response?.data || err.message);
        toast.error('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Filter, search & sort
  useEffect(() => {
    let temp = [...categories];

    // Search by name or slug
    if (search) {
      temp = temp.filter(
        (cat) =>
          cat.name.toLowerCase().includes(search.toLowerCase()) ||
          cat.slug.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      temp = temp.filter((cat) => cat.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Sort
    temp.sort((a, b) => {
      if (order === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    setFilteredCategories(temp);
    setCurrentPage(1); // Reset page on filter change
  }, [categories, search, statusFilter, order]);

  // Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / perPage);

  const changePage = (page) => setCurrentPage(page);

  // Toggle status (update backend)
  const toggleStatus = async (cat) => {
    try {
      const newStatus = cat.status === 'Active' ? 'Inactive' : 'Active';
      await axios.patch(`http://localhost:5000/api/v1/categories/${cat._id}`, {
        status: newStatus,
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? { ...c, status: newStatus } : c))
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  // Toggle trending (update backend)
  const toggleTrending = async (cat) => {
    try {
      const newTrending = !cat.isTreading;
      await axios.patch(`http://localhost:5000/api/v1/categories/${cat._id}`, {
        isTreading: newTrending,
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? { ...c, isTreading: newTrending } : c))
      );
      toast.success(`Show at Trending updated to ${newTrending ? 'Yes' : 'No'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update trending');
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast.success('Category deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete category');
    }
  };

  if (loading) return <p className="p-4 text-center text-white">Loading categories...</p>;

  return (
    <div className="p-4 md:p-6 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00baff]">Category List</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or slug"
            className="border dark:border-gray-700 dark:bg-gray-700 dark:placeholder-gray-300 dark:text-white rounded px-4 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            className="border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded px-4 py-2 w-full"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-lg font-medium">Categories</h1>
          <Link to="/dashboard/add-category">
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
              <th className="px-4 py-2">Show at Trending</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cat, index) => (
              <tr key={cat._id} className="border-t border-gray-200 dark:border-gray-700 text-sm">
                <td className="px-4 py-3">{indexOfFirst + index + 1}</td>
                <td className="px-4 py-3">
                  <img src={cat.icon} alt={cat.name} className="w-10 h-10 object-contain" />
                </td>
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3">{cat.slug}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleTrending(cat)}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm transition duration-200 ${
                      cat.isTreading
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-400 hover:bg-gray-500 text-white'
                    }`}
                  >
                    {cat.isTreading ? 'Yes' : 'No'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(cat)} 
                    className={`px-4 py-1 rounded-full shadow text-white text-xs sm:text-sm transition duration-200 ${
                      cat.status === 'Active'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    {cat.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link to={`/dashboard/update-category/${cat._id}`}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                        <FaEdit />
                      </button>
                    </Link>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                      <FaList />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
