import React, { useState } from "react";

const CertificateEditor = () => {
    const [background, setBackground] = useState(null);
    const [signature, setSignature] = useState(null);
    const [title, setTitle] = useState("Awarded to Rk Redoan");
    const [subTitle, setSubTitle] = useState("For completing Advanced Digital Marketing With Business Entrepreneur");
    const [description, setDescription] = useState(
        "This certificate is awarded to recognize the successful completion of the course [course] offered on the platform [platform_name] by [instructor_name]. The recipient, [student_name], has demonstrated commendable dedication and proficiency and has successfully completed the course on [date]."
    );

    // Handle file inputs (convert to base64 for preview)
    const handleImageUpload = (e, setter) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setter(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
            <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT FORM SIDE */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
                        Certificate Creator
                    </h2>

                    {/* Upload Background */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Background Image <span className="text-red-500">(900px * 600px)</span>
                        </label>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setBackground)} />
                    </div>

                    {/* Title */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Sub Title */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Sub Title</label>
                        <input
                            type="text"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Upload Signature */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-1">
                            Signature Image <span className="text-red-500">(128px * 40px)</span>
                        </label>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setSignature)} />
                    </div>

                    <button
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Generate Certificate
                    </button>
                </div>

                {/* RIGHT PREVIEW SIDE */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700 flex items-center justify-center relative">
                    {background ? (
                        <div className="relative w-full max-w-[800px] aspect-[3/2] overflow-hidden border dark:border-gray-600 rounded shadow">
                            <img src={background} alt="Certificate" className="w-full h-full object-cover absolute top-0 left-0" />

                            <div className="absolute top-1/3 w-full text-center px-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white drop-shadow-md">
                                    {title}
                                </h1>
                                <p className="mt-2 text-md md:text-lg font-medium text-gray-800 dark:text-gray-300">
                                    {subTitle}
                                </p>
                            </div>

                            <div className="absolute bottom-20 w-full text-center px-6">
                                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {signature && (
                                <img
                                    src={signature}
                                    alt="Signature"
                                    className="absolute bottom-6 right-10 h-10"
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-400">Upload background to preview certificate</p>
                    )}
                </div>
            </div>

            <div className="text-start text-sm text-gray-600 dark:text-gray-400 mt-8">
                All Rights Reserved BY: <span className="font-semibold">Inception BD</span>
            </div>
        </div>
    );
};

export default CertificateEditor;
