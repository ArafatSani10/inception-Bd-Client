import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoRemoveCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swal from "sweetalert2";

const CourseForm = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const tagInput = useRef("");

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      type: "paid",
      instructor: "",
      instructorTitle: "",
      title: "",
      thumbnail: null,
      demoImage: null,
      coverPhoto: null,
      instructorImage: null,
      price: 0,
      description: "",
      startingDate: "",
      duration: "",
      sessions: "",
      capacity: "",
      status: "",
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
      setLoading(true); // Start loader immediately

      data.category = "68a21bbad929bc483f4a7a66";

      const { demoImage, thumbnail, coverPhoto, instructorImage, ...rest } =
        data;
      const form_data = new FormData();

      if (thumbnail?.[0]) form_data.append("thumbnail", thumbnail[0]);
      if (coverPhoto?.[0]) form_data.append("coverPhoto", coverPhoto[0]);
      if (demoImage?.[0]) form_data.append("demoImage", demoImage[0]);
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

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/courses`,
        form_data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        Swal.fire({
          title: "<strong>🎉 Course Created!</strong>",
          html: "Your course has been successfully <b>added</b> ✅",
          icon: "success",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonColor: "#00baff",
          background: "linear-gradient(135deg, #1f2937, #111827)", // dark gradient
          color: "#ffffff", // text color
          iconColor: "#00baff",
          customClass: {
            popup:
              "rounded-3xl shadow-2xl p-6 border-2 border-cyan-500 animate-fadeIn",
            title: "text-2xl font-bold text-cyan-400",
            content: "text-lg text-gray-300",
            confirmButton:
              "text-white bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-full font-semibold transition-all duration-300",
          },
        });

        reset();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Failed to create course!");
    } finally {
      setLoading(false); // Hide loader after response
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-sm">
      <div className="border-b px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold text-[#00baff]">Create Course</h1>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            {/* Animated loader */}
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
              <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></span>
              <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></span>
            </div>
            <p className="mt-3 text-white text-lg font-semibold">
              Creating course...
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded shadow"
      >
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
              rows={4} // Adjust height
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   "
            />
          </div>

          <div>
            <label className="font-bold">Thumbnail</label>
            <input
              type="file"
              {...register("thumbnail", { valueAsFile: true })}
              className="w-full"
            />
          </div>
          <div>
            <label className="font-bold">Instructor Image</label>
            <input
              type="file"
              {...register("instructorImage", { valueAsFile: true })}
              className="w-full"
            />
          </div>

          <div>
            <label>Course Type</label>
            {/* <input
              type="number"
              {...register("price")}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            /> */}
            <select
              {...register("type")}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            >
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>
          </div>
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
          </h3>{" "}
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
        <section className="grid md:grid-cols-2 gap-4 mt-5">
          {/* <div>
                        <label className="block mb-1 text-gray-700 font-bold dark:text-gray-300">demo</label>
                        <input
                            type="file"
                            {...register("demoImage", { valueAsFile: true })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                        />
                    </div> */}
          <div>
            <label className="block mb-1 text-gray-700 font-bold dark:text-gray-300">
              Cover Photo
            </label>
            <input
              type="file"
              {...register("coverPhoto", { valueAsFile: true })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>
        </section>

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

          {/* <div>
                        <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">Capacity</label>
                        <input 
                            type="text"
                            {...register("capacity")}
                            placeholder="Capacity"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                        />
                    </div> */}
        </section>

        {/* Status */}
        <section className="mt-5">
          <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
               bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="published">Publish</option>
            {/* <option value="unPublished">Unpublish</option> */}
            {/* <option value="drafted">Draft</option> */}
          </select>
        </section>

        <button
          type="submit"
          className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
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

export default CourseForm;
