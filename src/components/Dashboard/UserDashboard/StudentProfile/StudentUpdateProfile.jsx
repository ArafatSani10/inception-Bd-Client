import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import AuthContext from '../../../Content/Authcontext';
import { FaUser, FaPhone, FaUserTag, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../Content/Authcontext';

const StudentUpdateProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.email) {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                    const singleUser = res.data?.data?.find((u) => u.email === user.email);

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
        setDbUser(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setDbUser(prev => ({ ...prev, profilePic: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            if (!dbUser) return;

            // Backend expected fields only
            const updatedData = {
                name: dbUser.name,
                phone: dbUser.phone,
                profilePic: dbUser.profilePic,
                education: dbUser.education,
                experience: dbUser.experience,
                jobTitle: dbUser.jobTitle,
                bio: dbUser.bio,
            };

            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/users/${dbUser._id}`,
                updatedData
            );


            const updatedUser = res.data.data || { ...dbUser, ...updatedData };

            // Update context so UserProfile updates
            updateUser(updatedUser);

            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('Failed to update profile');
        }
    };


    if (loading) return <p className="text-center text-gray-500 dark:text-gray-400 mt-20">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
    if (!dbUser) return <p className="text-center text-gray-500 dark:text-gray-400 mt-20">No user found.</p>;

    const profileImage = dbUser.profilePic || user?.photoURL || `https://ui-avatars.com/api/?name=${dbUser.name}`;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">



            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6 text-purple-500 dark:text-purple-400">Update Profile</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                    {['basic', 'education', 'experience', 'about'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 -mb-px font-semibold border-b-2 transition-all ${activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 dark:text-gray-400'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">

                    {activeTab === 'basic' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover" />
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                            <div>
                                <label className="block mb-1">Name</label>
                                <input type="text" name="name" value={dbUser.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                            </div>
                            <div>
                                <label className="block mb-1">Mobile Number</label>
                                <input type="text" name="phone" value={dbUser.phone || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div>
                            <label className="block mb-1">Education</label>
                            <textarea name="education" value={dbUser.education || ''} onChange={handleChange} rows={5} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                            <label className="block mb-1">Experience</label>
                            <textarea name="experience" value={dbUser.experience || ''} onChange={handleChange} rows={5} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1">Job Title</label>
                                <input type="text" name="jobTitle" value={dbUser.jobTitle || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                            </div>
                            <div>
                                <label className="block mb-1">Bio</label>
                                <textarea name="bio" value={dbUser.bio || ''} onChange={handleChange} rows={5} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                            </div>
                        </div>
                    )}

                    <div>
                        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">Save Changes</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentUpdateProfile;

