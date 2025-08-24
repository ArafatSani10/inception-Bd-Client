import React, { useState } from 'react';

const Updatecategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        icon: '',
        slug: '',
        showAtTrending: 'Yes',
        status: 'Active',
    });

    const [iconPreview, setIconPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'icon' && files.length > 0) {
            const file = files[0];
            setIconPreview(URL.createObjectURL(file));
            setFormData((prev) => ({
                ...prev,
                icon: file,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Submit logic goes here
    };

    return (
        <div className="min-h-screen p-4 md:p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-8 text-start text-[#00baff]">➕ Edit Category</h2>
 
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter category name"
                            className="rounded-lg border dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Slug */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            placeholder="e.g. digital-marketing"
                            className="rounded-lg border dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Show at Trending */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Show at Trending</label>
                        <select
                            name="showAtTrending"
                            value={formData.showAtTrending}
                            onChange={handleChange}
                            className="rounded-lg border dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="rounded-lg border dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Icon Upload */}
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label className="mb-2 font-medium">Icon</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="icon"
                            onChange={handleChange}
                            required
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#00baff] file:text-white hover:file:bg-blue-700 transition"
                        />
                        {iconPreview && (
                            <img
                                src={iconPreview}
                                alt="Icon Preview"
                                className="mt-4 w-20 h-20 object-contain rounded border dark:border-gray-600"
                            />
                        )}
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-[#00baff] text-white font-medium py-3 rounded-lg transition"
                        >
                            ✅ Submit Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updatecategory;
