import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoRemoveCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";



const CourseForm = () => {
    const { register, control, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            instructor: "",
            instructor_title: "",
            coursetitle: "",
            slug: "",
            thumbnail: null,
            demo_image: null,
            coverPhoto: null,
            price: "",
            about_course: "",
            course_create_date: "",
            course_duration: "",
            sessions: "",
            capacity: "",
            status: "",
            learnPoints: [{ value: "" }],
            requirements: [{ value: "" }],
            faqs: [{ question: "", answer: "" }],
            tags: [],
        },
    });

    const { fields: learnFields, append: appendLearn, remove: removeLearn } = useFieldArray({
        control,
        name: "learnPoints",
    });

    const { fields: requirementFields, append: appendRequirement, remove: removeRequirement } = useFieldArray({
        control,
        name: "requirements",
    });

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control,
        name: "faqs",
    });

    const tags = watch("tags");
    const tagInput = React.useRef("");
    

    // Tag handlers
    const handleAddTag = (e) => {
        if (e.key === "Enter" && tagInput.current.value.trim() !== "") {
            e.preventDefault();
            const newTag = tagInput.current.value.trim();
            if (!tags.includes(newTag)) {
                setValue("tags", [...tags, newTag]);
            }
            tagInput.current.value = "";
        }
    };

    const handleRemoveTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setValue("tags", newTags);
    };



    const onSubmit = async (data) => {
        try {
            console.log("📝 Raw Form Data:", data);

            // Upload images
            const thumbnailUrl = await uploadImage(data.thumbnail?.[0]);
            const demoUrl = await uploadImage(data.demo_image?.[0]);
            const bgUrl = await uploadImage(data.course_bg_image?.[0]);

            // Prepare final data
            const finalData = {
                ...data,
                thumbnail: thumbnailUrl,
                demo_image: demoUrl,
                course_bg_image: bgUrl,
            };


            const form_data = new FormData();
            if (data.demo_image?.[0]) {
                form_data.append("demoImage", data.demo_image?.[0])
            }

            if (data.thumbnail?.[0]) {
                form_data.append("thumbnail", data.thumbnail?.[0])
            }
            if (data.course_bg_image?.[0]) {
                form_data.append("courseBgImage", data.bgUrl?.[0])
            }

            form_data.append("data",data )


            console.log("🚀 Final Data Sent to Backend:", finalData);

            // Post to backend using raw axios
            const res = await axios.post("http://localhost:5000/api/v1/courses", form_data, {
              
            });

            console.log("✅ Server Response:", res.data);

            if (res.data.success) {
                toast.success("Course created successfully!");
                reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error("❌ Error:", error.response?.data || error.message);
            toast.error("Failed to create course!");
        }
    };


    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-sm">
            <div className="border-b px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center shadow">
                <h1 className="text-lg font-semibold text-[#00baff]">Create Course</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded shadow">
                {/* === Basic Infos === */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                            Instructor <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("instructor")}
                            placeholder="Enter Instructor Name"
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Instructor Title</label>
                        <input type="text" {...register("title")} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Course Title</label>
                        <input type="text" {...register("coursetitle")} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Slug</label>
                        <input type="text" {...register("slug")} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">About Course</label>
                        <input type="text" placeholder="150 - 160 characters recommended" {...register("about_course")} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Thumbnail</label>
                        <input type="file" {...register("thumbnail", { valueAsFile: true })} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Price</label>
                        <input type="number" {...register("price")} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>
                </section>

                {/* === Learn Points and Requirements === */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">Our Student Learn*</label>
                        {learnFields.map((field, index) => (
                            <div key={field.id} className="relative">
                                <input type="text" {...register(`learnPoints.${index}.value`)} placeholder={`Learn Point ${index + 1}`} className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full pr-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                                {learnFields.length > 1 && <button type="button" onClick={() => removeLearn(index)} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"><IoRemoveCircle size={20} /></button>}
                            </div>
                        ))}
                        <button type="button" onClick={() => appendLearn({ value: "" })} className="text-indigo-600 mt-2">Add Learn Point</button>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">Requirement*</label>
                        {requirementFields.map((field, index) => (
                            <div key={field.id} className="relative">
                                <input type="text" {...register(`requirements.${index}.value`)} placeholder={`Requirement ${index + 1}`} className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full pr-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                                {requirementFields.length > 1 && <button type="button" onClick={() => removeRequirement(index)} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"><IoRemoveCircle size={20} /></button>}
                            </div>
                        ))}
                        <button type="button" onClick={() => appendRequirement({ value: "" })} className="text-indigo-600 mt-2">Add Requirement</button>
                    </div>
                </section>

                {/* === FAQ === */}
                <section className="space-y-4">
                    {faqFields.map((field, index) => (
                        <div key={field.id} className="space-y-3 relative">
                            <input type="text" {...register(`faqs.${index}.question`)} placeholder={`Question ${index + 1}`} className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-transparent text-gray-900 dark:text-gray-100" />
                            <textarea {...register(`faqs.${index}.answer`)} placeholder={`Answer ${index + 1}`} rows={3} className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-transparent text-gray-900 dark:text-gray-100" />
                            {faqFields.length > 1 && <button type="button" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"><IoRemoveCircle size={20} /></button>}
                        </div>
                    ))}
                    <button type="button" onClick={() => appendFaq({ question: "", answer: "" })} className="text-indigo-600 mt-2">Add FAQ</button>
                </section>

                {/* === Tags === */}
                <section className="mt-5">
                    <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">Tags*</label>
                    <div className="flex flex-wrap gap-2 border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-900">
                        {tags.map((tag, index) => (
                            <div key={index} className="flex items-center bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full px-3 py-1 text-sm font-medium">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(index)} className="ml-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 focus:outline-none">
                                    <IoRemoveCircle size={20} />
                                </button>
                            </div>
                        ))}
                        <input type="text" placeholder="Add a tag and press Enter" ref={tagInput} onKeyDown={handleAddTag} className="flex-grow min-w-[120px] bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100" />
                    </div>
                </section>

                {/* === File Uploads === */}
                <section className="grid md:grid-cols-2 gap-4 mt-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Demo Image</label>
                        <input type="file" {...register("demo_image", { valueAsFile: true })} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Background Course Image</label>
                        <input type="file" {...register("course_bg_image", { valueAsFile: true })} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white" />
                    </div>
                </section>

                {/* === More Infos === */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <input type="date" {...register("course_create_date")} className="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100" />
                    <input type="number" {...register("course_duration")} placeholder="Duration in minutes" className="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100" />
                    <input type="number" {...register("sessions")} placeholder="Sessions" className="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100" />
                    <input type="text" {...register("capacity")} placeholder="Capacity" className="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100" />
                </section>

                {/* === Status === */}
                <section className="mt-5">
                    <label className="block mb-2 font-semibold text-lg text-gray-700 dark:text-gray-300">Status</label>
                    <select {...register("status")} className="w-full p-3 border rounded-md dark:bg-gray-900 dark:text-white focus:outline-none">
                        <option value="" disabled>Select status</option>
                        <option value="publish">Publish</option>
                        <option value="unpublish">Unpublish</option>
                        <option value="draft">Draft</option>
                    </select>
                </section>

                <button type="submit" className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default CourseForm;
