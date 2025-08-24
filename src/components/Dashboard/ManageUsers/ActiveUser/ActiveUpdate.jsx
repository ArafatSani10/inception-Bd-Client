import React, { useState } from "react";

const ActiveUpdate = () => {

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 max-w-full mx-auto">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#00baff]">Active User  Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your profile and preferences
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-full mx-auto">
                {/* Left Side: Profile Card */}
                <div className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800">
                    <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-900 dark:to-indigo-900"></div>

                    <div className="px-6 pb-6 -mt-12">
                        <div className="w-24 h-24 rounded-full border-4 mx-auto flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                            <span className="text-white text-4xl font-bold">MJ</span>
                        </div>

                        <div className="text-center mt-4">
                            <h2 className="text-xl font-bold">MJ Mod Lab</h2>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">mjmodlab@gmail.com</p>
                            <p className="text-xs mt-2 flex items-center justify-center gap-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-400 dark:bg-green-500"></span>
                                Active account
                            </p>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                                    <p className="text-sm">Joined</p>
                                    <p className="text-xs mt-1">03:42PM, 21 Jul 2025</p>
                                </div>
                                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                                    <p className="text-sm">Status</p>
                                    <p className="text-xs mt-1">Verified</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Send Message
                            </button>
                            <button className="flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white">
                                Ban User
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Information */}
                    <div className="rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <button className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                                Update Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Full Name", value: "MJ Mod Lab", type: "text" },
                                { label: "Phone", placeholder: "+1 (555) 000-0000", type: "text" },
                                { label: "Email", value: "mjmodlab@gmail.com", type: "email" },
                                { label: "Age", placeholder: "Enter your age", type: "text" },
                            ].map(({ label, value, placeholder, type }) => (
                                <div key={label}>
                                    <label className="text-sm block mb-1.5 text-gray-600 dark:text-gray-300">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        defaultValue={value}
                                        placeholder={placeholder}
                                        className="w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors duration-200 bg-gray-50 border border-gray-200 text-gray-800 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="text-sm block mb-1.5 text-gray-600 dark:text-gray-300">
                                    Gender
                                </label>
                                <select className="w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors duration-200 bg-gray-50 border border-gray-200 text-gray-800 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Profile Biography */}
                    <div className="rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-800">
                        <h3 className="text-lg font-semibold mb-4">Biography</h3>

                        <div className="space-y-4">
                            {[
                                { label: "Designation", placeholder: "e.g. Senior Instructor" },
                                { label: "Short Bio", placeholder: "Brief description about yourself" },
                            ].map(({ label, placeholder }) => (
                                <div key={label}>
                                    <label className="text-sm block mb-1.5 text-gray-600 dark:text-gray-300">
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        className="w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors duration-200 bg-gray-50 border border-gray-200 text-gray-800 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="text-sm block mb-1.5 text-gray-600 dark:text-gray-300">
                                    Full Bio
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Detailed information about your background, expertise, and experience..."
                                    className="w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors duration-200 bg-gray-50 border border-gray-200 text-gray-800 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 rounded-xl font-medium transition-colors duration-200 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                            Update Biography
                        </button>
                    </div>

                    <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4">Profile Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <select className="p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800">
                                <option>Select Country</option>
                            </select>
                            <input
                                type="text"
                                placeholder="State"
                                className="p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                className="p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 mb-4"
                        />
                        <button className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                            Update Profile
                        </button>
                    </div>

                    {/* Profile Socials */}
                    <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4">Profile Socials</h3>
                        {["Facebook", "Twitter", "LinkedIn", "Website", "Github"].map((social) => (
                            <input
                                key={social}
                                type="text"
                                placeholder={social}
                                className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 mb-3"
                            />
                        ))}
                        <button className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                            Update Profile
                        </button>
                    </div>

                    {/* Change Password */}
                    <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </div>
                        <button className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveUpdate;
