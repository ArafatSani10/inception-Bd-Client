import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";

const InstructorDetails = () => {
  const { email } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${email}`
        );
        setInstructor(res?.data?.data);
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-indigo-500 animate-spin"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 font-medium">
            Loading instructor details...
          </p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Instructor Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The instructor you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 ">
      <div className="max-w-full mx-auto">
        {/* Profile Card */}
        <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 dark:border-gray-700/30 transition-all duration-300 hover:shadow-3xl">
          {/* Header Section with Gradient */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/20 rounded-full"></div>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              {/* Profile Image */}
              <div className="relative group">
                <div className="relative w-40 h-40 group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-2  transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                  {instructor?.photo || instructor?.image ? (
                    <img
                      src={instructor?.photo}
                      alt={instructor?.name}
                      className="relative w-40 h-40 rounded-full object-cover border-4 border-white/30 shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 border-4 border-white/30 shadow-2xl text-2xl font-bold text-gray-900 dark:text-gray-100 transition-transform duration-300 hover:scale-105">
                      {instructor?.name
                        ? (() => {
                          const words = instructor.name.split(" ");
                          const firstInitial = words[0][0];
                          const lastInitial = words.length > 1 ? words[words.length - 1][0] : "";
                          return (firstInitial + lastInitial).toUpperCase();
                        })()
                        : "NA"}
                    </div>
                  )}
                </div>

                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                  {instructor?.isVerified ? (
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="bg-gray-400 text-white p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Name and Title */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold mb-2 animate-fade-in">{instructor?.name}</h1>
                <p className="text-indigo-100 font-medium text-lg mb-6">
                  {instructor?.jobTitle || "Instructor"}
                </p>

                {/* Status & Verification */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${instructor?.status === "active"
                      ? "bg-green-100/20 text-green-100 border border-green-300/30"
                      : "bg-red-100/20 text-red-100 border border-red-300/30"
                      }`}
                  >
                    <span className={`h-3 w-3 rounded-full ${instructor?.status === "active" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}></span>
                    {instructor?.status?.charAt(0).toUpperCase() + instructor?.status?.slice(1)}
                  </span>

                  {instructor?.isVerified && (
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100/20 text-blue-100 border border-blue-300/30 flex items-center gap-2 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified Instructor
                    </span>
                  )}
                </div>
              </div>


            </div>
          </div>



          {/* Details Section */}
          <div className="p-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <div className="bg-gray-50/50 dark:bg-gray-700/20 rounded-2xl p-6 transition-all duration-300 shadow-lg">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    About
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {instructor?.bio || "No bio available for this instructor."}
                  </p>
                </div>


                <div className="bg-gray-50/50 dark:bg-gray-700/20 rounded-2xl p-6 transition-all duration-300 shadow-lg">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
    Skills
  </h2>

  {Array.isArray(instructor?.skills) && instructor.skills.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {instructor.skills.map((skill, index) => (
        <span
          key={index}
          className="bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      No skills available for this instructor.
    </p>
  )}
</div>




                {/* Experience & Education */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="bg-white dark:bg-gray-700/20 rounded-2xl p-6 transition-all duration-300 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      Experience
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {instructor?.experience || "Experience info not added"}
                    </p>
                  </div>



                 
              


                  <div className="bg-white dark:bg-gray-700/20 rounded-2xl p-6 transition-all duration-300 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      Education
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {instructor?.education || "Education info not added"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-700/20 rounded-2xl p-6 transition-all duration-300 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p>{instructor?.phone || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="break-all">{instructor?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>



                {/* Joined Date */}
                <div className="bg-white dark:bg-gray-700/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                      <p>{new Date(instructor?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* lets connent with */} <h1>Lets connet with</h1>
                <div className="flex gap-4 justify-start items-center mt-6">
                  {[
                    { type: "facebook", url: instructor?.facebookUrl || "#", bg: "bg-blue-500", Icon: FaFacebookF },
                    { type: "youtube", url: instructor?.youtubeUrl || "#", bg: "bg-red-500", Icon: FaYoutube },
                    { type: "linkedin", url: instructor?.linkedinUrl || "#", bg: "bg-blue-600", Icon: FaLinkedinIn },
                    { type: "twitter", url: instructor?.twitterUrl || "#", bg: "bg-sky-400", Icon: FaTwitter },
                    { type: "github", url: instructor?.githubUrl || "#", bg: "bg-gray-500", Icon: FaGithub },
                    { type: "instagram", url: instructor?.instagramUrl || "#", bg: "bg-pink-500", Icon: FaInstagram },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden
                 bg-gray-200 dark:bg-gray-800 transition-colors duration-500 group"
                    >
                      <span
                        className={`absolute inset-0 ${item.bg} scale-0 group-hover:scale-100 rounded-full transition-transform duration-500`}
                      />
                      <item.Icon className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-500" />
                    </a>
                  ))}
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;