import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateBrand = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          name: data.name,
          website: data.website,
          status: data.status,
        })
      );

      if (thumbnail) formData.append("logo", thumbnail);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/brands`,
        formData,
        {
          headers: {
            // axios automatically sets correct Content-Type for FormData
            "Content-Type": "multipart/form-data",
          },
        }
      );


      toast.success("Brand created successfully!");
      reset();
      setThumbnail(null);
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(
        `Failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <Toaster position="top-right" />
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">
          Create Brand
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Brand Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Brand Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter brand name"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand Website */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Brand Website
            </label>
            <input
              {...register("website", { required: true })}
              type="text"
              placeholder="https://example.com"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col md:col-span-1">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Logo
            </label>
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200 bg-gray-50 dark:bg-gray-700"
              onClick={() => document.getElementById("brandImage")?.click()}
            >
              {thumbnail ? (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Logo Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-4xl text-gray-400 dark:text-gray-300 mb-2" />
                  <p className="text-gray-500 dark:text-gray-200">
                    Click to upload logo
                  </p>
                </>
              )}
            </div>
            <input
              id="brandImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Save Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;
