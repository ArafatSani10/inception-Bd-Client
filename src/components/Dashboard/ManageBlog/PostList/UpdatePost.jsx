import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

export default function UpdatePost() {
  const { register, handleSubmit, control, reset } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // alert("✅ Post Saved!");
    reset();
    setThumbnailPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Update Post</h2>
          <Link
            to="/dashboard/admin-home"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            onChange={(e) => {
              if (e.target.files[0]) {
                setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 
              file:text-sm file:font-semibold 
              file:bg-blue-50 file:text-blue-700 
              hover:file:bg-blue-100"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="preview"
              className="mt-3 w-48 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Title & Instructor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 border rounded-md 
                bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Instructor Name</label>
            <input
              type="text"
              {...register("instructor")}
              className="w-full p-2 border rounded-md 
                bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Instructor Name"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            rows="4"
            {...register("description")}
            className="w-full p-2 border rounded-md 
              bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="Write your description..."
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full p-2 border rounded-md 
              bg-white dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Show on Homepage */}
          <div>
            <label className="block text-sm mb-1">Show on Homepage</label>
            <Controller
              name="showHome"
              control={control}
              render={({ field }) => (
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <div
                    className={`w-11 h-6 rounded-full ${field.value ? "bg-green-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform ${field.value ? "translate-x-5" : "translate-x-1"
                        }`}
                    ></div>
                  </div>
                </label>
              )}
            />
          </div>

          {/* Popular */}
          <div>
            <label className="block text-sm mb-1">Mark as Popular</label>
            <Controller
              name="popular"
              control={control}
              render={({ field }) => (
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <div
                    className={`w-11 h-6 rounded-full ${field.value ? "bg-green-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform ${field.value ? "translate-x-5" : "translate-x-1"
                        }`}
                    ></div>
                  </div>
                </label>
              )}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm mb-1">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <div
                    className={`w-11 h-6 rounded-full ${field.value ? "bg-green-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform ${field.value ? "translate-x-5" : "translate-x-1"
                        }`}
                    ></div>
                  </div>
                </label>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
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
