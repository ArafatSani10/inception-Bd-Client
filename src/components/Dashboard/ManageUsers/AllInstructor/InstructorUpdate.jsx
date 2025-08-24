import React, { useState } from "react";

const InstructorUpdate = () => {
  // States
  const [showExpForm, setShowExpForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);

  const [experience, setExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: ""
  });

  const [education, setEducation] = useState({
    organization: "",
    degree: "",
    startDate: "",
    endDate: ""
  });

  // Handlers
  const handleExpChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleEduChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSaveExperience = () => {
    console.log("Saved Experience:", experience);
  };

  const handleSaveEducation = () => {
    console.log("Saved Education:", education);
  };

  return (
    <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-full mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Instructor Profile</h1>
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

          {/* Experience and Education */}
          <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-6">Experience and Education</h3>

            {/* Experience Table */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Experience</h4>
                <button
                  onClick={() => setShowExpForm((prev) => !prev)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {showExpForm ? "Close" : "Add Experience"}
                </button>
              </div>

              {showExpForm && (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 space-y-4 mb-4">
                  <input
                    type="text"
                    name="company"
                    value={experience.company}
                    onChange={handleExpChange}
                    placeholder="Company"
                    className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                  <input
                    type="text"
                    name="position"
                    value={experience.position}
                    onChange={handleExpChange}
                    placeholder="Position"
                    className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      name="startDate"
                      value={experience.startDate}
                      onChange={handleExpChange}
                      className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={experience.endDate}
                      onChange={handleExpChange}
                      className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <button
                    onClick={handleSaveExperience}
                    className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Save Experience
                  </button>
                </div>
              )}

              <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-200 dark:border-gray-700 p-2">No</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-2">Company</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-2">Position</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-2">Start Date</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-2">End Date</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500 dark:text-gray-400">
                      No Detail
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Education Table */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Education</h4>
                <button
                  onClick={() => setShowEduForm((prev) => !prev)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {showEduForm ? "Close" : "Add Education"}
                </button>
              </div>

              {showEduForm && (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 space-y-4 mb-4">
                  <input
                    type="text"
                    name="organization"
                    value={education.organization}
                    onChange={handleEduChange}
                    placeholder="Organization"
                    className="w-full p-3 rounded-lg  bg-white dark:bg-gray-800"
                  />
                  <input
                    type="text"
                    name="degree"
                    value={education.degree}
                    onChange={handleEduChange}
                    placeholder="Degree"
                    className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      name="startDate"
                      value={education.startDate}
                      onChange={handleEduChange}
                      className="w-full p-3 rounded-lg   bg-white dark:bg-gray-800"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={education.endDate}
                      onChange={handleEduChange}
                      className="w-full p-3 rounded-lg   bg-white dark:bg-gray-800"
                    />
                  </div>
                  <button
                    onClick={handleSaveEducation}
                    className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Save Education
                  </button>
                </div>
              )}

              <table className="w-full border-collapse    text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className=" p-2">No</th>
                    <th className=" p-2">Organization</th>
                    <th className=" p-2">Degree</th>
                    <th className=" p-2">Start Date</th>
                    <th className=" p-2">End Date</th>
                    <th className=" p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500 dark:text-gray-400">
                      No Detail
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Profile Location */}
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

export default InstructorUpdate;
