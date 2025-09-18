// UpdateCategoryForm.jsx (Enhanced with react-hook-form)
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../redux/api/categoryApi";

const UpdateCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [iconPreview, setIconPreview] = useState(null);

  // RTK Query hooks
  const { data: categoryData, isLoading, error } = useGetSingleCategoryQuery(id);
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  // React Hook Form setup with default values
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      isTreading: "false",
      status: "active",
      icon: null
    }
  });

  // Watch form values for real-time updates
  const watchedName = watch("name");
  const watchedSlug = watch("slug");
  const watchedIsTreading = watch("isTreading");
  const watchedStatus = watch("status");
  const watchedIcon = watch("icon");

  console.log("category data:", categoryData?.data);

  // Reset form with fetched data
  useEffect(() => {
    if (categoryData?.data) {
      const category = categoryData.data;
      
      // Reset form with new default values
      reset({
        name: category.name || "",
        slug: category.slug || "",
        isTreading: category.isTreading ? "true" : "false",
        status: category.status || "active",
        icon: null // File input should always start empty
      });

      // Clear any existing icon preview when data loads
      setIconPreview(null);
    }
  }, [categoryData, reset]);

  // Auto-generate slug from name if slug is empty
  useEffect(() => {
    if (watchedName && !watchedSlug) {
      const generatedSlug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue("slug", generatedSlug, { shouldDirty: true });
    }
  }, [watchedName, watchedSlug, setValue]);

  // Handle icon file change with validation
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        e.target.value = "";
        setIconPreview(null);
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        e.target.value = "";
        setIconPreview(null);
        return;
      }

      setIconPreview(URL.createObjectURL(file));
    } else {
      setIconPreview(null);
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("slug", data.slug.trim() || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      
      // Convert string to boolean for consistent handling
      const isTreadingBool = data.isTreading === "true";
      formData.append("isTreading", isTreadingBool.toString());
      formData.append("status", data.status);
      
      // Only append icon if new file is selected
      if (data.icon && data.icon[0]) {
        formData.append("icon", data.icon[0]);
      }

      await updateCategory({ id, formData }).unwrap();
      
      toast.success("Category updated successfully 🎉");
      navigate("/dashboard/categories");f
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err?.data?.message || "Failed to update category 😢");
    }
  };

  // Reset form to original values
  const handleResetForm = () => {
    if (categoryData?.data) {
      const category = categoryData.data;
      reset({
        name: category.name || "",
        slug: category.slug || "",
        isTreading: category.isTreading ? "true" : "false",
        status: category.status || "active",
        icon: null
      });
      setIconPreview(null);
      toast.info("Form reset to original values");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00baff] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading category data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Failed to load category</p>
          <button
            onClick={() => navigate("/categories")}
            className="px-4 py-2 bg-[#00baff] text-white rounded-lg hover:bg-blue-700"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const category = categoryData?.data;

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#00baff]">✏️ Update Category</h2>
          <div className="flex gap-2">
            {isDirty && (
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                🔄 Reset
              </button>
            )}
            <button
              onClick={() => navigate("/categories")}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              ← Back
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { 
                required: "Category name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                },
                maxLength: {
                  value: 50,
                  message: "Name must be less than 50 characters"
                }
              })}
              placeholder="Enter category name"
              className={`rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
            )}
          </div>

          {/* Slug */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Slug</label>
            <input
              type="text"
              {...register("slug", {
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: "Slug can only contain lowercase letters, numbers, and hyphens"
                }
              })}
              placeholder="e.g. digital-marketing (auto-generated)"
              className={`rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
                errors.slug ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.slug && (
              <span className="text-red-500 text-sm mt-1">{errors.slug.message}</span>
            )}
            <span className="text-xs text-gray-500 mt-1">
              Leave empty to auto-generate from name
            </span>
          </div>

          {/* Show at Trending */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Show at Trending</label>
            <select
              {...register("isTreading")}
              className="rounded-lg border border-gray-300 px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Status</label>
            <select 
              {...register("status")}
              className="rounded-lg border border-gray-300 px-4 py-2 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Icon Upload */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-2 font-medium">Icon</label>
            
            {/* Current Icon Display */}
            {category?.icon && !iconPreview && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Icon:</p>
                <img
                  src={category.icon}
                  alt="Current icon"
                  className="w-20 h-20 object-contain rounded border bg-gray-50 p-2"
                />
              </div>
            )}
            
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              {...register("icon")}
              onChange={handleIconChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-[#00baff] file:text-white file:border-0 hover:file:bg-blue-700 file:cursor-pointer"
            />
            
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPEG, PNG, GIF, WebP (Max 5MB). Leave empty to keep current icon.
            </p>
            
            {/* New Icon Preview */}
            {iconPreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Icon Preview:</p>
                <img
                  src={iconPreview}
                  alt="New icon preview"
                  className="w-20 h-20 object-contain rounded border bg-gray-50 p-2"
                />
              </div>
            )}
          </div>

          {/* Form Status Info */}
          {isDirty && (
            <div className="col-span-1 md:col-span-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                ℹ️ You have unsaved changes. Click "Update Category" to save or "Reset" to discard changes.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={isUpdating || Object.keys(errors).length > 0}
              className="w-full bg-[#00baff] text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "🔄 Updating..." : "✅ Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;