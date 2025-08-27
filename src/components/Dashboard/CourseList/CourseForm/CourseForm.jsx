// import React, { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { IoRemoveCircle } from "react-icons/io5";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const CourseForm = () => {
//   const [instructors, setInstructors] = useState([]);

//   const { register, control, handleSubmit, setValue, watch, reset } = useForm({
//     defaultValues: {
//       instructor: "",
//       instructorTitle: "",
//       title: "",
//       thumbnail: null,
//       demoImage: null,
//       coverPhoto: null,
//       price: "",
//       description: "",
//       startingDate: "",
//       duration: "",
//       sessions: "",
//       capacity: "",
//       status: "",
//       learningPoints: [""], // array of strings
//       requirements: [""], // array of strings
//       faqs: [{ question: "", answer: "" }],
//       tags: [],
//     },
//   });

//   // Fetch instructors
//   useEffect(() => {
//     const fetchInstructors = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/users?role=instructor"
//         );
//         const { data } = response;
//         if (data) setInstructors(data?.data);
//       } catch (error) {
//         console.error("Error fetching instructors:", error);
//       }
//     };
//     fetchInstructors();
//   }, []);

//   // Field arrays
//   const {
//     fields: learnFields,
//     append: appendLearn,
//     remove: removeLearn,
//   } = useFieldArray({ control, name: "learningPoints" });

//   const {
//     fields: requirementFields,
//     append: appendRequirement,
//     remove: removeRequirement,
//   } = useFieldArray({ control, name: "requirements" });

//   const {
//     fields: faqFields,
//     append: appendFaq,
//     remove: removeFaq,
//   } = useFieldArray({ control, name: "faqs" });

//   const tags = watch("tags");
//   const tagInput = React.useRef("");

//   // Tags handlers
//   const handleAddTag = (e) => {
//     if (e.key === "Enter" && tagInput.current.value.trim() !== "") {
//       e.preventDefault();
//       const newTag = tagInput.current.value.trim();
//       if (!tags.includes(newTag)) setValue("tags", [...tags, newTag]);
//       tagInput.current.value = "";
//     }
//   };

//   const handleRemoveTag = (index) => {
//     const newTags = [...tags];
//     newTags.splice(index, 1);
//     setValue("tags", newTags);
//   };

//   const onSubmit = async (data) => {
//     try {
//       data.category = "68a21bbad929bc483f4a7a66";
//       console.log("📝 Raw Form Data:", data);

//       const { demoImage, thumbnail, coverPhoto, ...rest } = data;
//       const form_data = new FormData();

//       if (thumbnail?.[0]) form_data.append("thumbnail", thumbnail[0]);
//       if (coverPhoto?.[0]) form_data.append("coverPhoto", coverPhoto[0]);
//       if (demoImage?.[0]) form_data.append("demoImage", demoImage[0]);

//       form_data.append("data", JSON.stringify(rest));

//       console.log("🚀 Final Data Sent to Backend:", rest);

//       const res = await axios.post(
//         "http://localhost:5000/api/v1/courses",
//         form_data
//       );

//       console.log("✅ Server Response:", res.data);
//       if (res.data.success) {
//         toast.success("Course created successfully!");
//         reset();
//       } else {
//         toast.error("Something went wrong!");
//       }
//     } catch (error) {
//       console.error("❌ Error:", error.response?.data || error.message);
//       toast.error("Failed to create course!");
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 text-sm">
//       <div className="border-b px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center shadow">
//         <h1 className="text-lg font-semibold text-[#00baff]">Create Course</h1>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded shadow"
//       >
//         {/* Basic Info */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
//               Instructor <span className="text-red-500">*</span>
//             </label>
//             <select
//               {...register("instructor")}
//               className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
//             >
//               <option value="">Select Instructor</option>
//               {instructors.map((instructor) => (
//                 <option key={instructor.id} value={instructor._id}>
//                   {instructor.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
//               Instructor Title
//             </label>
//             <input
//               type="text"
//               {...register("instructorTitle")}
//               className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
//               Course Title
//             </label>
//             <input
//               type="text"
//               {...register("title")}
//               className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
//               About Course
//             </label>
//             <input
//               type="text"
//               placeholder="150 - 160 characters recommended"
//               {...register("description")}
//               className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
//               Thumbnail
//             </label>
//             <input
//               type="file"
//               {...register("thumbnail", { valueAsFile: true })}
//               className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
//               Price
//             </label>
//             <input
//               type="number"
//               {...register("price")}
//               className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
//             />
//           </div>
//         </section>

//         {/* Learning Points & Requirements */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div className="space-y-3">
//             <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
//               Our Student Learn*
//             </label>
//             {learnFields.map((field, index) => (
//               <div key={index} className="relative">
//                 <input
//                   type="text"
//                   {...register(`learningPoints.${index}`)}
//                   placeholder={`Learn Point ${index + 1}`}
//                   className="border p-2 rounded w-full pr-8"
//                 />
//                 {learnFields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeLearn(index)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 font-bold"
//                   >
//                     <IoRemoveCircle size={20} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => appendLearn("")}
//               className="text-indigo-600 mt-2"
//             >
//               Add Learn Point
//             </button>
//           </div>

//           <div className="space-y-3">
//             <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
//               Requirement*
//             </label>
//             {requirementFields.map((field, index) => (
//               <div key={index} className="relative">
//                 <input
//                   type="text"
//                   {...register(`requirements.${index}`)}
//                   placeholder={`Requirement ${index + 1}`}
//                   className="border p-2 rounded w-full pr-8"
//                 />
//                 {requirementFields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeRequirement(index)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 font-bold"
//                   >
//                     <IoRemoveCircle size={20} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => appendRequirement("")}
//               className="text-indigo-600 mt-2"
//             >
//               Add Requirement
//             </button>
//           </div>
//         </section>

//         {/* FAQ */}
//         <section className="space-y-4">
//           {faqFields.map((field, index) => (
//             <div key={field.id} className="space-y-3 relative">
//               <input
//                 type="text"
//                 {...register(`faqs.${index}.question`)}
//                 placeholder={`Question ${index + 1}`}
//                 className="border p-2 rounded w-full"
//               />
//               <textarea
//                 {...register(`faqs.${index}.answer`)}
//                 placeholder={`Answer ${index + 1}`}
//                 rows={3}
//                 className="border p-2 rounded w-full"
//               />
//               {faqFields.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeFaq(index)}
//                   className="absolute top-2 right-2 text-red-600 font-bold"
//                 >
//                   <IoRemoveCircle size={20} />
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => appendFaq({ question: "", answer: "" })}
//             className="text-indigo-600 mt-2"
//           >
//             Add FAQ
//           </button>
//         </section>

//         {/* Tags */}
//         <section className="mt-5">
//           <label className="block mb-2 font-semibold">Tags*</label>
//           <div className="flex flex-wrap gap-2 border rounded p-2">
//             {tags.map((tag, index) => (
//               <div
//                 key={index}
//                 className="flex items-center bg-indigo-100 rounded-full px-3 py-1 text-sm font-medium"
//               >
//                 {tag}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveTag(index)}
//                   className="ml-2 text-indigo-600 hover:text-indigo-900 focus:outline-none"
//                 >
//                   <IoRemoveCircle size={20} />
//                 </button>
//               </div>
//             ))}
//             <input
//               type="text"
//               placeholder="Add a tag and press Enter"
//               ref={tagInput}
//               onKeyDown={handleAddTag}
//               className="flex-grow min-w-[120px] bg-transparent border-none focus:ring-0"
//             />
//           </div>
//         </section>

//         {/* File Uploads */}
//         <section className="grid md:grid-cols-2 gap-4 mt-5">
//           <div>
//             <label>Demo Image</label>
//             <input
//               type="file"
//               {...register("demoImage", { valueAsFile: true })}
//             />
//           </div>
//           <div>
//             <label>Background Course Image</label>
//             <input
//               type="file"
//               {...register("coverPhoto", { valueAsFile: true })}
//             />
//           </div>
//         </section>

//         {/* More Infos */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
//           <input
//             type="date"
//             {...register("startingDate")}
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             {...register("duration")}
//             placeholder="Duration in minutes"
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             {...register("sessions")}
//             placeholder="Sessions"
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             {...register("capacity")}
//             placeholder="Capacity"
//             className="p-2 border rounded"
//           />
//         </section>

//         {/* Status */}
//         <section className="mt-5">
//           <label>Status</label>
//           <select
//             {...register("status")}
//             className="w-full p-3 border rounded-md"
//           >
//             <option value="" disabled>
//               Select status
//             </option>
//             <option value="published">Publish</option>
//             <option value="unPublished">Unpublish</option>
//             <option value="drafted">Draft</option>
//           </select>
//         </section>

//         <button
//           type="submit"
//           className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// };

// export default CourseForm;

import React, { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoRemoveCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CourseForm = () => {
    const [instructors, setInstructors] = useState([]);
    const tagInput = useRef("");

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            instructor: "",
            instructorTitle: "",
            title: "",
            thumbnail: null,
            demoImage: null,
            coverPhoto: null,
            instructorImage:null,
            price: "",
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
                    "http://localhost:5000/api/v1/users?role=instructor"
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
            // Add category if needed
            data.category = "68a21bbad929bc483f4a7a66";

            const { demoImage, thumbnail, coverPhoto, instructorImage, ...rest } = data;
            const form_data = new FormData();

            if (thumbnail?.[0]) form_data.append("thumbnail", thumbnail[0]);
            if (coverPhoto?.[0]) form_data.append("coverPhoto", coverPhoto[0]);
            if (demoImage?.[0]) form_data.append("demoImage", demoImage[0]);
            if (instructorImage?.[0]) form_data.append("instructorImage", instructorImage[0]);


            // Transform learningPoints
            const payload = {
                ...rest,
                learningPoints: data.learningPoints.map((lp) => ({
                    subject: lp.subject,
                    subtitle: lp.subtitles.map((s) => s.point),
                })),
            };

            form_data.append("data", JSON.stringify(payload));

            const res = await axios.post(
                "http://localhost:5000/api/v1/courses",
                form_data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                toast.success("Course created successfully!");
                reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            toast.error("Failed to create course!");
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-sm">
            <div className="border-b px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center shadow">
                <h1 className="text-lg font-semibold text-[#00baff]">Create Course</h1>
            </div>

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
                        <input
                            type="text"
                            {...register("description")}
                            placeholder="150-160 characters recommended"
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label>Thumbnail</label>
                        <input
                            type="file"
                            {...register("thumbnail", { valueAsFile: true })}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label>instructorImage</label>
                        <input
                            type="file"
                            {...register("instructorImage", { valueAsFile: true })}
                            className="w-full"
                        />
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
                    <h3 className="font-semibold mb-2">Requirements*</h3>
                    {requirementFields.map((field, index) => (
                        <div key={index} className="relative mb-2">
                            <input
                                type="text"
                                {...register(`requirements.${index}`)}
                                className="w-full p-2 border rounded pr-8"
                            />
                            {requirementFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRequirement(index)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600"
                                >
                                    <IoRemoveCircle size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendRequirement("")}
                        className="text-indigo-600 mt-2"
                    >
                        + Add Requirement
                    </button>
                </section>

                {/* FAQ */}
                <section>
                    <h3 className="font-semibold mb-2">FAQ</h3>
                    {faqFields.map((field, index) => (
                        <div key={field.id} className="relative mb-4">
                            <input
                                {...register(`faqs.${index}.question`)}
                                placeholder="Question"
                                className="w-full p-2 border rounded mb-2"
                            />
                            <textarea
                                {...register(`faqs.${index}.answer`)}
                                placeholder="Answer"
                                rows={3}
                                className="w-full p-2 border rounded"
                            />
                            {faqFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeFaq(index)}
                                    className="absolute top-2 right-2 text-red-600"
                                >
                                    <IoRemoveCircle size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendFaq({ question: "", answer: "" })}
                        className="text-indigo-600 mt-2"
                    >
                        + Add FAQ
                    </button>
                </section>

                {/* Tags */}
                <section>
                    <h3 className="font-semibold mb-2">Tags*</h3>
                    <div className="flex flex-wrap gap-2 border rounded p-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-indigo-100 rounded-full px-3 py-1 text-sm font-medium"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(index)}
                                    className="ml-2 text-indigo-600"
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
                            className="flex-grow min-w-[120px] bg-transparent border-none focus:ring-0"
                        />
                    </div>
                </section>

                {/* File Uploads */}
                <section className="grid md:grid-cols-2 gap-4 mt-5">
                    <div>
                        <label>Demo Image</label>
                        <input type="file" {...register("demoImage", { valueAsFile: true })} />
                    </div>
                    <div>
                        <label>Cover Photo</label>
                        <input type="file" {...register("coverPhoto", { valueAsFile: true })} />
                    </div>
                </section>

                {/* More Infos */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <input type="date" {...register("startingDate")} className="p-2 border rounded" />
                    <input type="number" {...register("duration")} placeholder="Duration in minutes" className="p-2 border rounded" />
                    <input type="number" {...register("sessions")} placeholder="Sessions" className="p-2 border rounded" />
                    <input type="text" {...register("capacity")} placeholder="Capacity" className="p-2 border rounded" />
                </section>

                {/* Status */}
                <section className="mt-5">
                    <label>Status</label>
                    <select {...register("status")} className="w-full p-3 border rounded-md">
                        <option value="" disabled>Select status</option>
                        <option value="published">Publish</option>
                        <option value="unPublished">Unpublish</option>
                        <option value="drafted">Draft</option>
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
                        {...register(`learningPoints.${nestIndex}.subtitles.${index}.point`)}
                        placeholder="Subtitle"
                        className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
                    />
                    <button type="button" onClick={() => remove(index)} className="ml-2 text-red-600">
                        <IoRemoveCircle size={20} />
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => append({ point: "" })} className="text-blue-600 text-sm">
                + Add Subtitle
            </button>
        </div>
    );
};

export default CourseForm;