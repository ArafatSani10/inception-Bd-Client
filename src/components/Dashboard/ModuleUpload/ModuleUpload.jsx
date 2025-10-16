import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCourseQuery } from "../../../redux/api/courseApi";
import { useCreateModuleMutation } from "../../../redux/api/moduleApi";

export default function ModuleUpload() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [moduleType, setModuleType] = useState("exist"); // default: exist module
  const [moduleMode, setModuleMode] = useState("live"); // default: live

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const contentType = watch("contentType");

  const [createModule] = useCreateModuleMutation();
  const { data: courseRes, isLoading } = useGetAllCourseQuery({});
  const courseData = courseRes?.data;


  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading....</p>;

  const onSubmit = async (data) => {
    data.mode = moduleMode;

    // only include date & time if live mode
    if (moduleMode === "live") {
      data.startDate = data.startDate || "";
      data.startTime = data.startTime || "";
    } else {
      delete data.startDate;
      delete data.startTime;
    }
    try {
  
      await createModule(data).unwrap();
      window.location.href = "/dashboard/courses-list";
    } catch (error) {
      console.log("module creation error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
          Upload Module
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Module Mode */}
          <div className="flex gap-6 justify-center mb-4">
            {["live", "recorded", "resource"].map((mode) => (
              <label
                key={mode}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={mode}
                  checked={moduleMode === mode}
                  onChange={() => setModuleMode(mode)}
                  className="accent-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-200 capitalize">
                  {mode.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>

          {/* Course Select */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Select Course
            </label>
            <select
              {...register("courseId", { required: "Please select a course" })}
              onChange={(e) => {
                const courseId = e.target.value;
                const course = courseData.find((c) => c.id === courseId);
                setSelectedCourse(course);
              }}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
            >
              <option value="">-- Choose Course --</option>
              {courseData?.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.title}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseId.message}
              </p>
            )}
          </div>

          {/* Module Type */}
          <div className="flex gap-6 mb-4 justify-center">
            {["exist", "new"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={type}
                  checked={moduleType === type}
                  onChange={() => setModuleType(type)}
                  className="accent-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-200">
                  {type === "exist" ? "Exist Module" : "Create New Module"}
                </span>
              </label>
            ))}
          </div>

          {/* Topic / New Module */}
          {moduleType === "exist" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Select Topic
              </label>
              <select
                {...register("moduleId", { required: "Please select a topic" })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
              >
                <option value="">-- Choose Topic --</option>
                {selectedCourse?.modules
                  ?.filter((m) => m.mode === moduleMode)
                  ?.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.topic}
                    </option>
                  ))}
              </select>
              {errors.moduleId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.moduleId.message}
                </p>
              )}
            </div>
          )}

          {moduleType === "new" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Module Topic
              </label>
              <input
                type="text"
                placeholder="Introduction to Python"
                {...register("topic", { required: "Title is required" })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
              />
              {errors.topic && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.topic.message}
                </p>
              )}
            </div>
          )}

          {/* Content Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Content Title
            </label>
            <input
              type="text"
              placeholder="Introduction to Python"
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Content Type
            </label>
            <select
              {...register("contentType", { required: "Please select a type" })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
            >
              <option value="">-- Choose Type --</option>
              <option value="classLink">Zoom Link (Class)</option>
              <option value="link">Youtube Link</option>
              <option value="pdf">PDF (Drive Link)</option>
            </select>
            {errors.contentType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contentType.message}
              </p>
            )}
          </div>

          {/* Dynamic Content Input */}
          {["classLink", "link", "pdf"].includes(contentType) && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                {contentType === "classLink"
                  ? "Class Link URL"
                  : contentType === "link"
                  ? "YouTube Link URL"
                  : "PDF Link (Drive)"}
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register("content", { required: "URL is required" })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>
          )}

          {/* Live Module Extra Fields */}
          {moduleMode === "live" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  defaultValue=""
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Start Time
                </label>
                <input
                  type="time"
                  {...register("startTime")}
                  defaultValue=""
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Upload Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
