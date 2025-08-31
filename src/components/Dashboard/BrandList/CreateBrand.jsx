import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
      formData.append('name', data.name);
      formData.append('website', data.website); // backend expects number
      formData.append('status', data.status);   // active / inactive
      if (thumbnail) {
        formData.append('logo', thumbnail);
      }

      // 🔥 এখানে FULL URL ব্যবহার করো (Postman এর মতো)
      const response = await axios.post(
        "http://localhost:5000/api/v1/brands",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#00baff]">Create Brand</h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Brand Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter brand name"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>

          {/* Website (Number) */}
          <div>
            <label className="block mb-2 font-medium">Brand Website (Number)</label>
            <input
              {...register("website", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="Enter website number"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block mb-2 font-medium">Logo</label>
            <div
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
              onClick={() => document.getElementById("brandImage").click()}
            >
              {thumbnail ? (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Logo Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500">Click to upload</p>
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
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              {...register("status", { required: true })}
              className="w-full px-4 py-2 rounded-lg border"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
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
