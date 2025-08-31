// AddCategory.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const [iconPreview, setIconPreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug || "");
      // Convert string to boolean then back to string for consistent storage
      const isTreadingBool = data.isTreading === "true";
      formData.append("isTreading", isTreadingBool ? "true" : "false");
      formData.append("status", data.status);
      formData.append("icon", data.icon[0]);

      await axios.post("http://localhost:5000/api/v1/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Category added successfully 🎉");
      reset();
      setIconPreview(null);
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      toast.error("Failed to add category 😢");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-8 text-[#00baff]">➕ Add Category</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter category name"
              className="rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Slug</label>
            <input
              type="text"
              {...register("slug")}
              placeholder="e.g. digital-marketing"
              className="rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Show at Trending */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Show at Trending</label>
            <select
              {...register("isTreading")}
              className="rounded-lg border px-4 py-2"
              defaultValue="false"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Status</label>
            <select {...register("status")} className="rounded-lg border px-4 py-2" defaultValue="active">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Icon Upload */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-2 font-medium">Icon</label>
            <input
              type="file"
              accept="image/*"
              {...register("icon", { required: true })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setIconPreview(URL.createObjectURL(file));
              }}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-[#00baff] file:text-white hover:file:bg-blue-700"
            />
            {iconPreview && (
              <img
                src={iconPreview}
                alt="Preview"
                className="mt-4 w-20 h-20 object-contain rounded border"
              />
            )}
          </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#00baff] text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
            >
              ✅ Submit Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
