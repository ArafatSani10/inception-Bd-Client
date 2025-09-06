import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorDetails = () => {
  const { email } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${email}`
        );
        setInstructor(res?.data?.data); // API থেকে আসা user details
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchInstructor();
    }
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600 dark:text-gray-300">
          Loading instructor details...
        </p>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500">Instructor not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Profile Card */}
      <div className="bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <img
            src={
              instructor?.photo ||
              instructor?.image ||
              "https://via.placeholder.com/150"
            }
            alt={instructor?.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-[#00baff] dark:text-[#00baff]">
              {instructor?.name}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
              {instructor?.jobTitle || "Not specified"}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              📧 {instructor?.email}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              📞 {instructor?.phone || "Not provided"}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              🎓 {instructor?.education || "Education info not added"}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              💼 {instructor?.experience || "Experience info not added"}
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {instructor?.bio || "No bio available"}
            </p>

            {/* Status & Verification */}
            <div className="mt-4 flex flex-wrap gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  instructor?.status === "active"
                    ? "bg-green-500/20 text-green-600"
                    : "bg-red-500/20 text-red-600"
                }`}
              >
                {instructor?.status}
              </span>
              {instructor?.isVerified && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-600">
                  ✅ Verified
                </span>
              )}
            </div>

            {/* Created At */}
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Joined: {new Date(instructor?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
