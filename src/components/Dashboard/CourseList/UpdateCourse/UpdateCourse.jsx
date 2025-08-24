import React, { useState } from 'react';
import { IoRemoveCircle } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCourse = () => {
    const [formData, setFormData] = useState({
        instructor: '',
        title: '',
        slug: '',
        thumbnail: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };





    const [learnInputs, setLearnInputs] = useState([""]);
    const [requirementInputs, setRequirementInputs] = useState([""]);

    // Our Student Learn input change
    const handleLearnChange = (index, e) => {
        const values = [...learnInputs];
        values[index] = e.target.value;
        setLearnInputs(values);
    };

    // Requirement input change
    const handleRequirementChange = (index, e) => {
        const values = [...requirementInputs];
        values[index] = e.target.value;
        setRequirementInputs(values);
    };

    // Enter press in Our Student Learn
    const handleLearnKeyDown = (index, e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (index === learnInputs.length - 1) {
                setLearnInputs([...learnInputs, ""]);
            }
        }
    };

    // Enter press in Requirement
    const handleRequirementKeyDown = (index, e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (index === requirementInputs.length - 1) {
                setRequirementInputs([...requirementInputs, ""]);
            }
        }
    };

    // Remove input from Our Student Learn
    const removeLearnInput = (index) => {
        const values = [...learnInputs];
        values.splice(index, 1);
        if (values.length === 0) values.push(""); // minimum 1 input thakbe
        setLearnInputs(values);
    };

    // Remove input from Requirement
    const removeRequirementInput = (index) => {
        const values = [...requirementInputs];
        values.splice(index, 1);
        if (values.length === 0) values.push("");
        setRequirementInputs(values);
    };


    const [faqInputs, setFaqInputs] = useState([{ question: "", answer: "" }]);

    // Change handler for FAQ inputs
    const handleFaqChange = (index, field, e) => {
        const values = [...faqInputs];
        values[index][field] = e.target.value;
        setFaqInputs(values);
    };

    // Enter key handler to add new FAQ input on last input Enter press
    const handleFaqKeyDown = (index, e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (index === faqInputs.length - 1) {
                setFaqInputs([...faqInputs, { question: "", answer: "" }]);
            }
        }
    };

    // Remove FAQ input
    const removeFaqInput = (index) => {
        const values = [...faqInputs];
        values.splice(index, 1);
        if (values.length === 0) values.push({ question: "", answer: "" });
        setFaqInputs(values);
    };

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    // Remove tag handler
    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-sm">
            <div className="border-b px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center shadow">
                <h1 className="text-lg font-semibold text-[#00baff]">Edit Course</h1>
            </div>

            <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded shadow">

                {/* === Basic Infos === */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">Basic Infos</h2>

                    {/* Instructor */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                            Instructor <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        >
                            <option value="">Select</option>
                            <option value="instructor1">Md Ridoy Hossain</option>
                            <option value="instructor2">Boktiar Ahmed Bappy</option>
                            <option value="instructor3">Md Maruf Hossain</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                            Instructor Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Slug */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                            Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            type="text"
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    {/* About Course */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                            About Course
                        </label>
                        <input
                            type="text"
                            placeholder="150 - 160 characters recommended"
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                            Thumbnail <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="thumbnail"
                            onChange={handleChange}
                            type="file"
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Demo Video Storage */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4 items-start">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                Demo Video Storage <span className="text-red-500 text-xs">(optional)</span>
                            </label>
                            <select className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white">
                                <option>youtube</option>
                                <option>vimeo</option>
                                <option>external_link</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Path</label>
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">🔗</span>
                                <input
                                    type="text"
                                    placeholder="paste your external link"
                                    className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price and Discount */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                Discount Price
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                    </div>


                </section>


                {/* course info */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">Course Information</h2>

                    {/* Our Student Learn */}
                    <div className="space-y-3">
                        <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
                            Our Student Learn*
                        </label>
                        {learnInputs.map((input, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full pr-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                    placeholder={`Learn Point ${index + 1}`}
                                    value={input}
                                    onChange={(e) => handleLearnChange(index, e)}
                                    onKeyDown={(e) => handleLearnKeyDown(index, e)}
                                />
                                {/* X button */}
                                {learnInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeLearnInput(index)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"
                                        title="Remove"
                                    >
                                        <IoRemoveCircle size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Requirement */}
                    <div className="mt-5 space-y-3">
                        <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
                            Requirement*
                        </label>
                        {requirementInputs.map((input, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full pr-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                    placeholder={`Requirement ${index + 1}`}
                                    value={input}
                                    onChange={(e) => handleRequirementChange(index, e)}
                                    onKeyDown={(e) => handleRequirementKeyDown(index, e)}
                                />
                                {/* X button */}
                                {requirementInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRequirementInput(index)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"
                                        title="Remove"
                                    >
                                        <IoRemoveCircle size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* FAQ Inputs */}
                    <div className="mt-5 ">
                        <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-3">
                            FAQs*
                        </label>

                        {faqInputs.map((faq, index) => (
                            <div
                                key={index}
                                className="space-y-5 rounded relative bg-gray-50 dark:bg-gray-900  border border-gray-300 dark:border-gray-700"
                            >
                                {/* Question Input */}
                                <input
                                    type="text"
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                    placeholder={`Question ${index + 1}`}
                                    value={faq.question}
                                    onChange={(e) => handleFaqChange(index, "question", e)}
                                    onKeyDown={(e) => handleFaqKeyDown(index, e)}
                                    required
                                />

                                {/* Answer Input */}
                                <textarea
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full resize-none bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                    rows={3}
                                    placeholder={`Answer ${index + 1}`}
                                    value={faq.answer}
                                    onChange={(e) => handleFaqChange(index, "answer", e)}
                                    onKeyDown={(e) => handleFaqKeyDown(index, e)}
                                    required
                                />

                                {/* Remove button */}
                                {faqInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFaqInput(index)}
                                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"
                                        title="Remove FAQ"
                                    >
                                        <IoRemoveCircle size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>


                    {/* Tags Input */}
                    <div className="mt-5">
                        <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                            Tags*
                        </label>
                        <div className="flex flex-wrap gap-2 border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-900">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full px-3 py-1 text-sm font-medium"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 focus:outline-none"
                                        title="Remove tag"
                                    >
                                        <IoRemoveCircle size={20}></IoRemoveCircle>
                                    </button>
                                </div>
                            ))}

                            <input
                                type="text"
                                className="flex-grow min-w-[120px] bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Add a tag and press Enter"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && tagInput.trim() !== "") {
                                        e.preventDefault();
                                        if (!tags.includes(tagInput.trim())) {
                                            setTags([...tags, tagInput.trim()]);
                                        }
                                        setTagInput("");
                                    }
                                }}
                            />
                        </div>
                    </div>

                </section>

                {/* === More Infos === */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">More info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                                Capacity*
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 bg-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                placeholder="Enter course capacity"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                                Course Duration (minutes)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 bg-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                placeholder="Duration in minutes"
                            />
                        </div>
                    </div>
                </section>




                {/* === Finish === */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">Finish</h2>
                    <div className="text-green-500 font-semibold space-y-3">
                        {/* Message for reviewer */}
                        <div className="text-left text-gray-700 dark:text-gray-300">
                            <label className="block mb-2 font-semibold text-lg">Message for Reviewer*</label>
                            <textarea
                                rows={4}
                                placeholder="Write your message here..."
                                className="w-full p-3 rounded-md dark:bg-gray-900 dark:text-white resize-none"
                            />
                        </div>

                        {/* Status select input */}
                        <div className="text-left">
                            <label className="block mb-2 font-semibold text-lg text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                className="w-full p-3 border rounded-md dark:bg-gray-900 dark:text-white focus:outline-none"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="publish">Publish</option>
                                <option value="unpublish">Unpublish</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </section>
            </div>

            <ToastContainer />
        </div>
    );
};

export default UpdateCourse;
