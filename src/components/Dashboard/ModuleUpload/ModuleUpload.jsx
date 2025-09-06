import React from "react";
import { useForm } from "react-hook-form";

export default function ModuleUpload() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const contentType = watch("contentType");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("✅ Form submitted! (Check console)");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Upload Module
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Select */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Course
            </label>
            <select
              {...register("course", { required: "Please select a course" })}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">-- Choose Course --</option>
              <option value="react">React Basics</option>
              <option value="node">Node.js Advanced</option>
              <option value="python">Python for AI</option>
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course.message}
              </p>
            )}
          </div>

          {/* Topic Select */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Topic</label>
            <select
              {...register("topic", { required: "Please select a topic" })}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">-- Choose Topic --</option>
              <option value="intro">Introduction</option>
              <option value="hooks">React Hooks</option>
              <option value="routing">React Routing</option>
              <option value="state">State Management</option>
              <option value="deployment">Deployment</option>
            </select>
            {errors.topic && (
              <p className="text-red-500 text-sm mt-1">
                {errors.topic.message}
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
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="external">External Link</option>
            </select>
            {errors.contentType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contentType.message}
              </p>
            )}
          </div>

          {/* Conditional Inputs */}
          {contentType === "article" && (
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                {...register("content", {
                  required: "Content is required for article",
                })}
                rows="5"
                placeholder="Write your article here..."
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>
          )}

          {contentType === "external" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                External URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register("externalUrl", {
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

          {(contentType === "video" || contentType === "pdf") && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload File
              </label>
              <input
                type="file"
                {...register("file", { required: "File is required" })}
                className="block w-full"
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.file.message}
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
