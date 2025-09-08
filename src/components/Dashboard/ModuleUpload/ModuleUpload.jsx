import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCourseQuery } from "../../../redux/api/courseApi";
import { useCreateModuleMutation } from "../../../redux/api/moduleApi";

export default function ModuleUpload() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectModule, setSelectModule] = useState(null);
  const [moduleType, setModuleType] = useState("exist"); // default: exist module
  const [moduleMode, setModuleMode] = useState("live"); // default: exist module

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

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const onSubmit = async (data) => {
    data.mode = moduleMode
    console.log("Form Data:", data);

    try {
      const result = await createModule(data).unwrap();
      window.location.href = "/dashboard/courses-list"
    } catch (error) {
      console.log("module creation error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Upload Module
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="live"
                checked={moduleMode === "live"}
                onChange={() => setModuleMode("live")}
              />
              <span>Live Class</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="recorded"
                checked={moduleMode === "recorded"}
                onChange={() => setModuleMode("recorded")}
              />
              <span>Recorded Class</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="resource"
                checked={moduleMode === "resource"}
                onChange={() => setModuleMode("resource")}
              />
              <span>Class Materials</span>
            </label>
          </div>
          {/* Course Select */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Course
            </label>
            <select
              {...register("courseId", { required: "Please select a course" })}
              onChange={(e) => {
                const courseId = e.target.value;
                const course = courseData.find((c) => c.id === courseId);
                setSelectedCourse(course);
              }}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">-- Choose Course --</option>
              {courseData?.length &&
                courseData?.map((value, index) => (
                  <option key={index} value={value?.id}>
                    {value?.title}
                  </option>
                ))}
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course.message}
              </p>
            )}
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="exist"
                checked={moduleType === "exist"}
                onChange={() => setModuleType("exist")}
              />
              <span>Exist Module</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="new"
                checked={moduleType === "new"}
                onChange={() => setModuleType("new")}
              />
              <span>Create New Module</span>
            </label>
          </div>

          {/* Topic Select */}

          {moduleType === "exist" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Topic
              </label>
              <select
                {...register("moduleId", { required: "Please select a topic" })}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="">-- Choose Topic --</option>
                {selectedCourse?.modules?.map((module, index) => (
                  <option key={index} value={module.id}>
                    {module.topic}
                  </option>
                ))}
              </select>
              {errors.topic && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.topic.message}
                </p>
              )}
            </div>
          )}

          {moduleType === "new" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Module Topic
              </label>
              <input
                type="text"
                placeholder="introduction to python"
                {...register("topic", {
                  required: "Title is required",
                })}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.externalUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.externalUrl.message}
                </p>
              )}
            </div>
          )}

          {/* when module doesn't exist */}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content Title
            </label>
            <input
              type="text"
              placeholder="introduction to python"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.externalUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.externalUrl.message}
              </p>
            )}
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content Type
            </label>
            <select
              {...register("contentType", { required: "Please select a type" })}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">-- Choose Type --</option>
              {/* <option value="article">Article</option> */}
              {/* <option value="video">Video</option> */}
              {/* <option value="pdf">PDF</option> */}
              <option value="classLink">Zoom Link(Class Link)</option>
              <option value="link">Youtube Link</option>
              <option value="pdf">PDF (Drive Link)</option>
            </select>
            {errors.contentType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contentType.message}
              </p>
            )}
          </div>

          {contentType === "classLink" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Class LInk URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register("content", {
                  required: "URL is required",
                })}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.externalUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.externalUrl.message}
                </p>
              )}
            </div>
          )}
          {contentType === "link" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Youtube LInk URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register("content", {
                  required: "URL is required",
                })}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.externalUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.externalUrl.message}
                </p>
              )}
            </div>
          )}
          {contentType === "pdf" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                PDF LInk (Drive)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register("content", {
                  required: "URL is required",
                })}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.externalUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.externalUrl.message}
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Upload Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
