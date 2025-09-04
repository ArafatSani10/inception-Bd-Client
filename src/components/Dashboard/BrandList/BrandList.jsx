import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function BrandList() {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/brands`);
      if (res.data.success) setBrands(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/brands/${id}`, {
        status: currentStatus === "active" ? "inactive" : "active",
      });
      fetchBrands(); // Update list after status change
    } catch (err) {
      console.error("Error updating brand status:", err);
    }
  };



  const deleteBrand = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/brands/${id}`);
        Swal.fire("Deleted!", "Brand has been deleted.", "success");
        fetchBrands();
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#00baff]">Brand List</h2>
        <Link to="/dashboard/create-brand">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
            + Add New
          </button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-100 font-semibold">
              <th className="py-3 px-4">SN</th>
              <th className="py-3 px-4">Logo</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">website</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-contain bg-gray-100 p-1 rounded" />

                </td>
                <td className="py-3 px-4">{brand.name}</td>
                <td className="py-3 px-4">
                  <a
                    href={brand.website.startsWith("http") ? brand.website : `https://${brand.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {brand.website}
                  </a>
                </td>

                <td className="py-3 px-4">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={brand.status === "active"}
                      onChange={() => toggleStatus(brand.id, brand.status)}
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${brand.status === "active" ? "bg-green-500" : "bg-red-500"}`} />
                    <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${brand.status === "active" ? "translate-x-6" : "translate-x-0"}`} />
                  </label>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <Link to={`/dashboard/update-brand/${brand.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded" title="Edit"><FaEdit size={16} /></button>
                  </Link>
                  <button onClick={() => deleteBrand(brand.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded" title="Delete"><FaTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
