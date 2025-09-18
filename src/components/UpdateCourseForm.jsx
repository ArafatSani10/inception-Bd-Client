import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoRemoveCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleCourseQuery,
  useUpdateOneMutation,
} from "../redux/api/courseApi";

const UpdateCourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const tagInput = useRef("");

  // RTK Query hooks
  const {
    data: courseData,
    isLoading: courseLoading,
    error: courseError,
  } = useGetSingleCourseQuery(courseId);
  const [updateCourse] = useUpdateOneMutation();

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      instructor: "",
      instructorTitle: "",
      title: "",
      thumbnail: null,
      demoImage: null,
      coverPhoto: null,
      instructorImage: null,
      price: "",
      description: "",
      startingDate: "",
      duration: "",
      sessions: "",
      capacity: "",
      status: courseData?.data?.status || "",
      learningPoints: [{ subject: "", subtitles: [{ point: "" }] }],
      requirements: [""],
      faqs: [{ question: "", answer: "" }],
      tags: [],
    },
  });

  const tags = watch("tags");

  // Fetch instructors
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users?role=instructor`
        );
        if (res.data?.data) setInstructors(res.data.data);
      } catch (err) {
        console.error("Error fetching instructors:", err);
      }
    };
    fetchInstructors();
  }, []);

  // Populate form with existing course data
  useEffect(() => {
    if (courseData?.data) {
      const course = courseData.data;

      // Format learning points
      const formattedLearningPoints = course.learningPoints?.map((lp) => ({
        subject: lp.subject || "",
        subtitles: lp.subtitle?.map((point) => ({ point })) || [{ point: "" }],
      })) || [{ subject: "", subtitles: [{ point: "" }] }];

      // Format date for input field
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      // Reset form with course data
      reset({
        instructor: course.instructor?._id || course.instructor || "",
        instructorTitle: course.instructorTitle || "",
        title: course.title || "",
        price: course.price || "",
        description: course.description || "",
        startingDate: formatDate(course.startingDate),
        duration: course.duration || "",
        sessions: course.sessions || "",
        capacity: course.capacity || "",
        status: course.status || "",
        learningPoints: formattedLearningPoints,
        requirements:
          course.requirements?.length > 0 ? course.requirements : [""],
        faqs:
          course.faqs?.length > 0
            ? course.faqs
            : [{ question: "", answer: "" }],
        tags: course.tags || [],
        // Don't set file inputs as they should remain empty for new uploads
        thumbnail: null,
        demoImage: null,
        coverPhoto: null,
        instructorImage: null,
      });
    }
  }, [courseData, reset]);

  // Field arrays
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });

  const {
    fields: lpFields,
    append: appendLearningPoint,
    remove: removeLearningPoint,
  } = useFieldArray({ control, name: "learningPoints" });

  // Tags handlers
  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.current.value.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.current.value.trim();
      if (!tags.includes(newTag)) setValue("tags", [...tags, newTag]);
      tagInput.current.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setValue("tags", newTags);
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { thumbnail, coverPhoto, instructorImage, ...rest } =
        data;

      // Create FormData only if there are files to upload
      const hasFiles =
        thumbnail?.[0] ||
        coverPhoto?.[0] ||
        instructorImage?.[0];

      if (hasFiles) {
        // If files are present, use FormData
        const form_data = new FormData();

        if (thumbnail?.[0]) form_data.append("thumbnail", thumbnail[0]);
        if (coverPhoto?.[0]) form_data.append("coverPhoto", coverPhoto[0]);
        if (instructorImage?.[0])
          form_data.append("instructorImage", instructorImage[0]);

        const payload = {
          ...rest,
          learningPoints: data.learningPoints.map((lp) => ({
            subject: lp.subject,
            subtitle: lp.subtitles.map((s) => s.point),
          })),
        };

        form_data.append("data", JSON.stringify(payload));

        // Use axios directly for FormData
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/courses/update/${courseId}`,
          form_data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (res.data.success) {
          showSuccessAlert();
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        // If no files, use RTK Query mutation with JSON data
        const payload = {
          ...rest,
          learningPoints: data.learningPoints.map((lp) => ({
            subject: lp.subject,
            subtitle: lp.subtitles.map((s) => s.point),
          })),
        };

        const result = await updateCourse({
          id: courseId,
          ...payload,
        }).unwrap();

        if (result.success) {
          showSuccessAlert();
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to update course!");
    } finally {
      setLoading(false);
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "<strong>🎉 Course Updated!</strong>",
      html: "Your course has been successfully <b>updated</b> ✅",
      icon: "success",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonColor: "#00baff",
      background: "linear-gradient(135deg, #1f2937, #111827)",
      color: "#ffffff",
      iconColor: "#00baff",
      customClass: {
        popup:
          "rounded-3xl shadow-2xl p-6 border-2 border-cyan-500 animate-fadeIn",
        title: "text-2xl font-bold text-cyan-400",
        content: "text-lg text-gray-300",
        confirmButton:
          "text-white bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-full font-semibold transition-all duration-300",
      },
    }).then(() => {
      navigate("/dashboard/courses-list"); // Adjust the navigation path as needed
    });
  };

  // Loading and error states
  if (courseLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></span>
          </div>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg font-semibold">
            Loading course...
          </p>
        </div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Course
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Course not found or failed to load.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-sm">
      <div className="border-b px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold text-[#00baff]">Update Course</h1>
        <button
          onClick={() => navigate("/courses")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Courses
        </button>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
              <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></span>
              <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></span>
            </div>
            <p className="mt-3 text-white text-lg font-semibold">
              Updating course...
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded shadow"
      >
        {/* Display current images */}
        {/* {courseData?.data && (
          <section className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Current Images
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courseData.data.thumbnail && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Thumbnail
                  </label>
                  <img
                    src={courseData.data.thumbnail}
                    alt="Current thumbnail"
                    className="w-full h-24 object-cover rounded border"
                  />
                </div>
              )}
              {courseData.data.coverPhoto && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Cover Photo
                  </label>
                  <img
                    src={courseData.data.coverPhoto}
                    alt="Current cover"
                    className="w-full h-24 object-cover rounded border"
                  />
                </div>
              )}
              {courseData.data.instructorImage && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Instructor Image
                  </label>
                  <img
                    src={courseData.data.instructorImage}
                    alt="Current instructor"
                    className="w-full h-24 object-cover rounded border"
                  />
                </div>
              )}
              {courseData.data.demoImage && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Demo Image
                  </label>
                  <img
                    src={courseData.data.demoImage}
                    alt="Current demo"
                    className="w-full h-24 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </section>
        )} */}

        {/* Basic Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold mb-1">Instructor*</label>
            <select
              {...register("instructor")}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select Instructor</option>
              {instructors.map((inst) => (
                <option key={inst._id} value={inst._id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Instructor Title</label>
            <input
              type="text"
              {...register("instructorTitle")}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Course Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">About Course</label>
            <textarea
              {...register("description")}
              placeholder="About Courses"
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                       placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* <div>
            <label className="font-bold">New Thumbnail (optional)</label>
            <input
              type="file"
              {...register("thumbnail", { valueAsFile: true })}
              className="w-full"
            />
            <small className="text-gray-500">
              Leave empty to keep current thumbnail
            </small>
          </div> */}
          {/* <div>
            <label className="font-bold">New Instructor Image (optional)</label>
            <input
              type="file"
              {...register("instructorImage", { valueAsFile: true })}
              className="w-full"
            />
            <small className="text-gray-500">
              Leave empty to keep current image
            </small>
          </div> */}

          <div>
            <label>Price</label>
            <input
              type="number"
              {...register("price")}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            />
          </div>
        </section>

        {/* Learning Points */}
        <section>
          <h3 className="font-semibold mb-3">Learning Points*</h3>
          {lpFields.map((lp, lpIndex) => (
            <div
              key={lp.id}
              className="mb-4 p-4 border rounded bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center gap-2 mb-3">
                <input
                  {...register(`learningPoints.${lpIndex}.subject`)}
                  placeholder="Enter subject"
                  className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeLearningPoint(lpIndex)}
                  className="text-red-600"
                >
                  <IoRemoveCircle size={22} />
                </button>
              </div>
              <Subtitles nestIndex={lpIndex} {...{ control, register }} />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              appendLearningPoint({ subject: "", subtitles: [{ point: "" }] })
            }
            className="text-indigo-600 mt-2"
          >
            + Add New Subject
          </button>
        </section>

        {/* Requirements */}
        <section>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Requirements*
          </h3>
          {requirementFields.map((field, index) => (
            <div
              key={index}
              className="relative mb-2 bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 rounded-lg shadow-sm"
            >
              <input
                type="text"
                {...register(`requirements.${index}`)}
                className="w-full p-2 pr-8 rounded-md border-none 
                       bg-transparent text-gray-800 dark:text-gray-100 
                       placeholder-gray-500 dark:placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter requirement"
              />
              {requirementFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 
                         text-red-600 dark:text-red-400 hover:scale-110 transition"
                >
                  <IoRemoveCircle size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendRequirement("")}
            className="text-indigo-600 dark:text-indigo-400 mt-2 hover:underline"
          >
            + Add Requirement
          </button>
        </section>

        {/* FAQ */}
        <section>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            FAQ
          </h3>
          {faqFields.map((field, index) => (
            <div
              key={field.id}
              className="relative mb-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 shadow-sm"
            >
              <input
                {...register(`faqs.${index}.question`)}
                placeholder="Question"
                className="w-full p-2 mb-2 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <textarea
                {...register(`faqs.${index}.answer`)}
                placeholder="Answer"
                rows={3}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {faqFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="absolute top-2 right-2 text-red-600 dark:text-red-400 hover:scale-110 transition"
                >
                  <IoRemoveCircle size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendFaq({ question: "", answer: "" })}
            className="text-indigo-600 dark:text-indigo-400 mt-2 hover:underline"
          >
            + Add FAQ
          </button>
        </section>

        {/* Tags */}
        <section>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            Tags*
            <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              (Press Enter to add)
            </span>
          </h3>
          <div className="flex flex-wrap mt-4 gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-indigo-100 dark:bg-indigo-900/40 
                       text-indigo-800 dark:text-indigo-200 rounded-full px-3 py-1 text-sm font-medium"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition"
                >
                  <IoRemoveCircle size={18} />
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              ref={tagInput}
              onKeyDown={handleAddTag}
              className="flex-grow min-w-[120px] bg-transparent border-none focus:ring-0 
                     text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </section>

        {/* File Uploads */}
        {/* <section className="grid md:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block mb-1 text-gray-700 font-bold dark:text-gray-300">
              New Cover Photo (optional)
            </label>
            <input
              type="file"
              {...register("coverPhoto", { valueAsFile: true })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
            <small className="text-gray-500">
              Leave empty to keep current cover photo
            </small>
          </div>
        </section> */}

        {/* More Infos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
              Starting Date
            </label>
            <input
              type="date"
              {...register("startingDate")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
              Duration (optional)
            </label>
            <input
              type="number"
              {...register("duration")}
              placeholder="Duration in hours"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-700 dark:text-gray-300">
              Number of Lecture (optional)
            </label>
            <input
              type="number"
              {...register("sessions")}
              placeholder="Number of sessions"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>
        </section>

        {/* Status */}
        {/* <select
  {...register("status")}
  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
             bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200
             dark:[&>option]:bg-gray-900 dark:[&>option]:text-gray-200"
>
  <option value="" disabled>
    Select status
  </option>
  <option value="published">Publish</option>
  <option value="unPublished">Unpublish</option>
</select> */}

        <div className="flex gap-4 mt-5">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

// Subtitles nested array component
const Subtitles = ({ nestIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `learningPoints.${nestIndex}.subtitles`,
  });

  return (
    <div className="ml-4">
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center mb-2">
          <input
            {...register(
              `learningPoints.${nestIndex}.subtitles.${index}.point`
            )}
            placeholder="Subtitle"
            className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="ml-2 text-red-600"
          >
            <IoRemoveCircle size={20} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ point: "" })}
        className="text-blue-600 text-sm"
      >
        + Add Subtitle
      </button>
    </div>
  );
};

export default UpdateCourseForm;
