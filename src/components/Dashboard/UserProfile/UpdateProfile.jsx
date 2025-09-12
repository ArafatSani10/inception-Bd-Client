

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import AuthContext from "../../../Content/Authcontext";
// import { toast } from "react-toastify";
// // import AuthContext from "../../../../Content/Authcontext";



// const UpdateProfile = () => {
//   const { user, updateUser } = useContext(AuthContext);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [photoFile, setPhotoFile] = useState("");
//   console.log("photo file", photoFile);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (user?.email) {
//           const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
//           const singleUser = res.data?.data?.find(
//             (u) => u.email === user.email
//           );

//           if (singleUser) {
//             setDbUser(singleUser);
//           } else {
//             setError("User not found in database");
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setError("Failed to fetch user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDbUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       if (!dbUser) return;
//       const formData = new FormData();

//       // Backend schema fields
//       const updatedData = {
//         id: dbUser?.id || "",

//         name: dbUser?.name || "",
//         email: dbUser?.email || "",
//         phone: dbUser?.phone || "",
//         password: dbUser?.password || "",

//         role: dbUser?.role ,
//         status: dbUser?.status ,

//         photo: dbUser?.photo || dbUser?.profilePic || "",
//         isVerified: dbUser?.isVerified ?? false,

//         otpCode: dbUser?.otpCode || "",
//         otpExpiresAt: dbUser?.otpExpiresAt ? new Date(dbUser.otpExpiresAt) : null,

//         education: dbUser?.education || "",
//         experience: dbUser?.experience || "",
//         bio: dbUser?.bio || "",
//         jobTitle: dbUser?.jobTitle || "",
//         skills: dbUser?.skills || [],

//         facebookUrl: dbUser?.facebookUrl || "",
//         youtubeUrl: dbUser?.youtubeUrl || "",
//         linkedInUrl: dbUser?.linkedInUrl || "",
//         githubUrl: dbUser?.githubUrl || "",
//         twitterUrl: dbUser?.twitterUrl || "",

//         createdAt: dbUser?.createdAt ? new Date(dbUser.createdAt) : new Date(),
//         updatedAt: new Date(),
//       };
//       formData.append("photo", photoFile);
//       formData.append("data", JSON.stringify(updatedData));

//       const res = await axios.patch(
//         `${import.meta.env.VITE_API_URL}/users/${dbUser.id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );


//       const updatedUser = res.data.data || { ...dbUser, ...updatedData };
//       updateUser(updatedUser);
//       alert("profile updated")

//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       //   alert("Failed to update profile");
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
//         Loading profile...
//       </p>
//     );
//   if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
//   if (!dbUser)
//     return (
//       <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
//         No user found.
//       </p>
//     );

//   const profileImage =
//     dbUser.photo ||
//     dbUser.profilePic ||
//     user?.photoURL ||
//     `https://ui-avatars.com/api/?name=${dbUser.name}`;

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-6 text-purple-500 dark:text-purple-400">
//           Update Profile
//         </h1>

//         {/* Tabs */}
//         <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
//           {["basic", "education", "experience", "about", "skills", "social Media"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 -mb-px font-semibold border-b-2 transition-all ${activeTab === tab
//                 ? "border-blue-500 text-blue-500"
//                 : "border-transparent text-gray-500 dark:text-gray-400"
//                 }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="space-y-6">
//           {activeTab === "basic" && (
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={dbUser?.photo || profileImage}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setPhotoFile(e.target.files[0])}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={dbUser.name}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Mobile Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={dbUser.phone || ""}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//             </div>
//           )}

//           {activeTab === "education" && (
//             <div>
//               <label className="block mb-1">Education</label>
//               <textarea
//                 name="education"
//                 value={dbUser.education || ""}
//                 onChange={handleChange}
//                 rows={5}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//             </div>
//           )}

//           {activeTab === "experience" && (
//             <div>
//               <label className="block mb-1">Experience</label>
//               <textarea
//                 name="experience"
//                 value={dbUser.experience || ""}
//                 onChange={handleChange}
//                 rows={5}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//             </div>
//           )}

//           {activeTab === "about" && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1">Job Title</label>
//                 <input
//                   type="text"
//                   name="jobTitle"
//                   value={dbUser.jobTitle || ""}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Bio</label>
//                 <textarea
//                   name="bio"
//                   value={dbUser.bio || ""}
//                   onChange={handleChange}
//                   rows={5}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//             </div>
//           )}


//           {activeTab === "skills" && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1">Skills</label>
//                 <div className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     {dbUser.skills?.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-blue-600 text-white rounded-full flex items-center gap-2 text-sm"
//                       >
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => {
//                             const updated = dbUser.skills.filter((_, i) => i !== index);
//                             handleChange({ target: { name: "skills", value: updated } });
//                           }}
//                           className="text-xs hover:text-red-300"
//                         >
//                           ✕
//                         </button>
//                       </span>
//                     ))}
//                   </div>

//                   <input
//                     type="text"
//                     placeholder="Type a skill and press Enter"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && e.target.value.trim() !== "") {
//                         e.preventDefault();
//                         const newSkill = e.target.value.trim();
//                         const updated = [...(dbUser.skills || []), newSkill];
//                         handleChange({ target: { name: "skills", value: updated } });
//                         e.target.value = "";
//                       }
//                     }}
//                     className="w-full bg-transparent outline-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}


//           {activeTab === "social Media" && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1">Facebook</label>
//                 <input
//                   type="url"
//                   name="facebook"
//                   value={dbUser.facebook || ""}
//                   onChange={handleChange}
//                   placeholder="https://facebook.com/username"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg 
//         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Youtube</label>
//                 <input
//                   type="url"
//                   name="facebook"
//                   value={dbUser.youtube || ""}
//                   onChange={handleChange}
//                   placeholder="https://youtube.com/username"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg 
//         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">LinkedIn</label>
//                 <input
//                   type="url"
//                   name="linkedin"
//                   value={dbUser.linkedin || ""}
//                   onChange={handleChange}
//                   placeholder="https://linkedin.com/in/username"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg 
//         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">GitHub</label>
//                 <input
//                   type="url"
//                   name="github"
//                   value={dbUser.github || ""}
//                   onChange={handleChange}
//                   placeholder="https://github.com/username"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg 
//         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Twitter</label>
//                 <input
//                   type="url"
//                   name="twitter"
//                   value={dbUser.twitter || ""}
//                   onChange={handleChange}
//                   placeholder="https://twitter.com/username"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg 
//         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//               </div>
//             </div>
//           )}



//           <div>
//             <button
//               onClick={handleSave}
//               className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;




import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../Content/Authcontext";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // For the loading spinner
import Swal from "sweetalert2"; // For the success alert

const UpdateProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // New state for loading on update
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
          const singleUser = res.data?.data?.find(
            (u) => u.email === user.email
          );

          if (singleUser) {
            setDbUser(singleUser);
          } else {
            setError("User not found in database");
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDbUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsUpdating(true); // Start loading
    try {
      if (!dbUser) return;
      const formData = new FormData();

      const updatedData = {
        id: dbUser?.id || "",
        name: dbUser?.name || "",
        email: dbUser?.email || "",
        phone: dbUser?.phone || "",
        password: dbUser?.password || "",
        role: dbUser?.role,
        status: dbUser?.status,
        photo: dbUser?.photo || dbUser?.profilePic || "",
        isVerified: dbUser?.isVerified ?? false,
        otpCode: dbUser?.otpCode || "",
        otpExpiresAt: dbUser?.otpExpiresAt
          ? new Date(dbUser.otpExpiresAt)
          : null,
        education: dbUser?.education || "",
        experience: dbUser?.experience || "",
        bio: dbUser?.bio || "",
        jobTitle: dbUser?.jobTitle || "",
        skills: dbUser?.skills || [],
        facebookUrl: dbUser?.facebookUrl || "",
        youtubeUrl: dbUser?.youtubeUrl || "",
        linkedInUrl: dbUser?.linkedInUrl || "",
        githubUrl: dbUser?.githubUrl || "",
        twitterUrl: dbUser?.twitterUrl || "",
        createdAt: dbUser?.createdAt ? new Date(dbUser.createdAt) : new Date(),
        updatedAt: new Date(),
      };

      if (photoFile) {
        formData.append("photo", photoFile);
      }
      formData.append("data", JSON.stringify(updatedData));

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${dbUser.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const updatedUser = res.data.data || { ...dbUser, ...updatedData };
      updateUser(updatedUser);

      // Swal.fire({
      //   icon: "success",
      //   title: "Success!",
      //   text: "Your profile has been updated successfully.",
      //   confirmButtonText: "OK",
      //   didOpen: () => {
      //     const SwalContainer = Swal.getPopup();
      //     if (SwalContainer) {
      //       SwalContainer.style.backgroundColor = 'var(--bg-color-1)';
      //       SwalContainer.style.color = 'var(--text-color-1)';
      //     }
      //   }
      // });
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully 🎉",
        confirmButtonText: "Great!",
        customClass: {
          popup: "rounded-2xl shadow-xl p-5",
          title: "text-xl font-semibold",
          content: "text-gray-200",
          confirmButton: "px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        },
        background: "rgba(15, 23, 42, 0.85)", // subtle dark glass effect
        color: "#f8fafc",
        didOpen: () => {
          const SwalContainer = Swal.getPopup();
          if (SwalContainer) {
            SwalContainer.style.border = "2px solid rgba(56, 189, 248, 0.7)";
            SwalContainer.style.backdropFilter = "blur(6px)";
          }
        },
        willClose: () => {
          location.reload(); // Confirm click -> page reload
        }
      });


    } finally {
      setIsUpdating(false); // Stop loading
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <FaSpinner className="animate-spin text-purple-500 text-5xl" />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!dbUser)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
        No user found.
      </p>
    );

  const profileImage =
    dbUser.photo ||
    dbUser.profilePic ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${dbUser.name}`;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-purple-500 dark:text-purple-400">
          Update Profile
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            "basic",
            "education",
            "experience",
            "about",
            "skills",
            "social Media",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 -mb-px font-semibold border-b-2 transition-all ${activeTab === tab
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 dark:text-gray-400"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={dbUser?.photo || profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files[0])}
                />
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={dbUser.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  value={dbUser.phone || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div>
              <label className="block mb-1">Education</label>
              <textarea
                name="education"
                value={dbUser.education || ""}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}

          {activeTab === "experience" && (
            <div>
              <label className="block mb-1">Experience</label>
              <textarea
                name="experience"
                value={dbUser.experience || ""}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={dbUser.jobTitle || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={dbUser.bio || ""}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Skills</label>
                <div className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {dbUser.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full flex items-center gap-2 text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = dbUser.skills.filter(
                              (_, i) => i !== index
                            );
                            handleChange({
                              target: { name: "skills", value: updated },
                            });
                          }}
                          className="text-xs hover:text-red-300"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim() !== "") {
                        e.preventDefault();
                        const newSkill = e.target.value.trim();
                        const updated = [...(dbUser.skills || []), newSkill];
                        handleChange({
                          target: { name: "skills", value: updated },
                        });
                        e.target.value = "";
                      }
                    }}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "social Media" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Facebook</label>
                <input
                  type="url"
                  name="facebookUrl"
                  value={dbUser.facebookUrl || ""}
                  onChange={handleChange}
                  placeholder="https://facebook.com/username"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">Youtube</label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={dbUser.youtubeUrl || ""}
                  onChange={handleChange}
                  placeholder="https://youtube.com/username"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">LinkedIn</label>
                <input
                  type="url"
                  name="linkedInUrl"
                  value={dbUser.linkedInUrl || ""}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">GitHub</label>
                <input
                  type="url"
                  name="githubUrl"
                  value={dbUser.githubUrl || ""}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">Twitter</label>
                <input
                  type="url"
                  name="twitterUrl"
                  value={dbUser.twitterUrl || ""}
                  onChange={handleChange}
                  placeholder="https://twitter.com/username"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          )}

          <div>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition flex items-center justify-center gap-2"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <FaSpinner className="animate-spin" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
