import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  // Fetch brand data
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/brands/${id}`
        );

        console.log("Fetched brand:", res.data);

        if (res.data?.success) {
          const brand = res.data.data;
          setValue("name", brand?.name || "");
          setValue("website", brand?.website || "");
          setValue("status", brand?.status?.toLowerCase() || "inactive");
          setThumbnail(brand?.logo || "");
        }
      } catch (err) {
        console.error("Error fetching brand:", err);
        toast.error("Failed to fetch brand");
      }
    };

    if (id) fetchBrand();
  }, [id, setValue]);


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      console.log("Selected file:", e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("website", data.website);
      formData.append("status", data.status);

      const fileInput = document.getElementById("brandImage");
      if (fileInput?.files?.[0]) {
        formData.append("logo", fileInput.files[0]);
      }

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) console.log(key, value);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/brands/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Backend response:", response.data);
      if (response.data.success) toast.success("Brand updated successfully!");
      else toast.error("Update failed!");

      // After success, navigate back and refresh list
      setTimeout(() => navigate("/dashboard/brand-list", { replace: true }), 500);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(`Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <Toaster position="top-right" />
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">Update Brand</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Brand Name</label>
            <input {...register("name", { required: true })} type="text" placeholder="Brand name"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Brand Website</label>
            <input {...register("website", { required: true })} type="text" placeholder="https://example.com"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex flex-col md:col-span-1">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Logo</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200 bg-gray-50 dark:bg-gray-700"
              onClick={() => document.getElementById("brandImage")?.click()}>
              {thumbnail ? <img src={thumbnail} alt="Logo" className="w-32 h-32 object-cover rounded-lg" />
                : <>
                  <FaCloudUploadAlt className="text-4xl text-gray-400 dark:text-gray-300 mb-2" />
                  <p className="text-gray-500 dark:text-gray-200">Click to upload logo</p>
                </>}
            </div>
            <input id="brandImage" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Status</label>
            <select {...register("status", { required: true })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
              Update Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrand;
