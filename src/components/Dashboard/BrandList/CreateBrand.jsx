import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const CreateBrand = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#00baff]">
          Create Brand
        </h2>

        <div className="space-y-6">
          {/* Brand Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Brand URL
            </label>
            <input
              type="text"
              placeholder="Enter brand website URL"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Thumbnail / Logo
            </label>
            <div
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center 
              border-gray-300 dark:border-gray-600 cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById('brandImage').click()}
            >
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">Click to upload</p>
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
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
              py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Save Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
