import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const initialBrands = [
    {
        id: 1,
        name: "Laravel",
        description: "Laravel",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
        status: "Inactive",
    },
    {
        id: 2,
        name: "Google",
        description: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        status: "Active",
    },
    {
        id: 3,
        name: "Adobe",
        description: "Adobe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Adobe_Corporate_Logo.png",
        status: "Active",
    },
    {
        id: 4,
        name: "Namecheap",
        description: "Namecheap",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Namecheap_logo.png",
        status: "Inactive",
    },
    {
        id: 5,
        name: "Godaddy",
        description: "Godaddy",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/GoDaddy_logo.svg",
        status: "Inactive",
    },
    {
        id: 6,
        name: "Freelancer",
        description: "Freelancer",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Freelancer.com_logo.png",
        status: "Active",
    },
    {
        id: 7,
        name: "Upwork",
        description: "Upwork",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Upwork-logo.svg",
        status: "Active",
    },
    {
        id: 8,
        name: "Fiverr",
        description: "Fiverr",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Fiverr_logo.svg",
        status: "Active",
    },
];

export default function BrandList() {
    const [brands, setBrands] = useState(initialBrands);

    const toggleStatus = (id) => {
        setBrands((prev) =>
            prev.map((brand) =>
                brand.id === id
                    ? {
                        ...brand,
                        status: brand.status === "Active" ? "Inactive" : "Active",
                    }
                    : brand
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#00baff]">
                    Brand List
                </h2>
                <Link to="/dashboard/admin-home">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-bold">Dashboard</span> / Brand List
                    </p>
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex justify-end items-center mb-6">

                    <Link to="/dashboard/create-brand">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition duration-200">
                            + Add New
                        </button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-100 font-semibold">
                                <th className="py-3 px-4">SN</th>
                                <th className="py-3 px-4">Logo</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((brand, index) => (
                                <tr
                                    key={brand.id}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="w-12 h-12 object-contain bg-gray-100 p-1 rounded"
                                        />
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {brand.name}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                        {brand.description}
                                    </td>
                                    <td className="py-3 px-4">
                                        <label className="inline-flex relative items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={brand.status === "Active"}
                                                onChange={() => toggleStatus(brand.id)}
                                            />
                                            <div
                                                className={`w-12 h-6 rounded-full transition-colors duration-300 ${brand.status === "Active"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            />
                                            <span
                                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300
                        ${brand.status === "Active"
                                                        ? "translate-x-6"
                                                        : "translate-x-0"
                                                    }
                        `}
                                            />
                                        </label>
                                    </td>
                                    <td className="py-3 px-4 flex gap-3">
                                        <Link to="/dashboard/update-brand">
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition duration-150"
                                                title="Edit"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-150"
                                            title="Delete"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
