import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePost() {
  const { register, handleSubmit, control, reset } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);

  const base_url = "http://localhost:5000/api/v1"; // set your base URL

  // Fetch instructors & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(`${base_url}/users?role=instructor`);
        setInstructors(usersRes.data?.data || []);

        const catRes = await axios.get(`${base_url}/categories`);
        setCategories(catRes.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching data!");
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug || "");
      formData.append("description", data.description);
      formData.append("content", data.content);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("seoTitle", data.seoTitle || "");
      formData.append("seoDescription", data.seoDescription || "");
      formData.append("isPublished", data.isPublished || false);
      formData.append("isShowHome", data.isShowHome || false);
      formData.append("isPopular", data.isPopular || false);

      if (data.tags) {
        formData.append(
          "tags",
          JSON.stringify(data.tags.split(",").map((t) => t.trim()))
        );
      }

      if (data.thumbnail && data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      const res = await axios.post(`${base_url}/blogs`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Blog created:", res.data);
      toast.success("Blog created successfully!");
      reset();
      setThumbnailPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error saving blog!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Create Blog Post</h2>
          <Link
            to="/dashboard/admin-home"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            onChange={(e) =>
              e.target.files[0] &&
              setThumbnailPreview(URL.createObjectURL(e.target.files[0]))
            }
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 file:text-sm file:font-semibold 
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="preview"
              className="mt-3 w-48 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input
              type="text"
              {...register("slug")}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="auto-generated or custom"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            rows="3"
            {...register("description")}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="Short description..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            rows="6"
            {...register("content")}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="Write blog content..."
          />
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Author (Instructor)</label>
            <select
              {...register("author", { required: true })}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select Instructor</option>
              {Array.isArray(instructors) &&
                instructors.map((inst) => (
                  <option key={inst._id} value={inst._id}>
                    {inst.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* SEO & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">SEO Title</label>
            <input
              type="text"
              {...register("seoTitle")}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">SEO Description</label>
            <input
              type="text"
              {...register("seoDescription")}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Tags (comma separated)</label>
          <input
            type="text"
            {...register("tags")}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="e.g. react, javascript"
          />
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["isPublished", "isShowHome", "isPopular"].map((field) => (
            <div key={field}>
              <label className="block text-sm mb-1">{field.replace("is", "")}</label>
              <Controller
                name={field}
                control={control}
                render={({ field: f }) => (
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={f.value || false}
                    onChange={(e) => f.onChange(e.target.checked)}
                  />
                )}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
