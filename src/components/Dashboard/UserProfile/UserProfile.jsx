



import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaKey, FaBriefcase, FaGraduationCap, FaFileAlt } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import AuthContext from '../../../Content/Authcontext';


const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.email) {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                    const singleUser = res.data.data.find(u => u.email === user.email);
                    setDbUser(singleUser);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [user]);

    if (loading) return <p className="text-center text-gray-500 dark:text-gray-400 mt-20">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
    if (!dbUser) return <p className="text-center text-gray-500 dark:text-gray-400 mt-20">No user found.</p>;

    const profileImage = dbUser.photo || dbUser.image || `https://ui-avatars.com/api/?name=${dbUser.name}`;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">

            {/* Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-900 p-8 flex flex-col items-center shadow-xl rounded-tr-3xl rounded-br-3xl transition-colors duration-500">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                    <img src={profileImage} alt={dbUser.name} className="w-full h-full object-cover" />
                    <span
                        className={`absolute bottom-3 right-3 w-6 h-6 rounded-full border-2 border-gray-900 ${dbUser.status === 'active' ? 'bg-green-400 animate-ping' : 'bg-red-500'
                            }`}
                    ></span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-purple-500 dark:text-purple-400">{dbUser.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{dbUser.role.toUpperCase()}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">ID: {dbUser.id}</p>

                {/* Quick Stats */}
                <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-3 rounded-lg shadow hover:shadow-lg transition-all duration-300">
                        <span className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Status</span>
                        <span className={`font-semibold ${dbUser.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{dbUser.status}</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-3 rounded-lg shadow hover:shadow-lg transition-all duration-300">
                        <span className="flex items-center gap-2"><FaKey className="text-yellow-500" /> Verified</span>
                        <span className={`font-semibold ${dbUser.isVerified ? 'text-green-500' : 'text-red-500'}`}>{dbUser.isVerified ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-3 space-y-6">
                <h1 className="text-3xl max-sm:text-2xl font-bold text-purple-500 dark:text-purple-400 mb-4"> {dbUser?.role} Profile Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaUser className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Full Name</p>
                            <p className="font-semibold text-lg">{dbUser.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaEnvelope className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                            <p className="font-semibold text-lg">{dbUser.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaPhone className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Mobile Number</p>
                            <p className="font-semibold text-lg">{dbUser.phone || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaUserTag className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Role</p>
                            <p className="font-semibold text-lg">{dbUser.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaCalendarAlt className="text-gray-500 dark:text-gray-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Created At</p>
                            <p className="font-semibold text-lg">{new Date(dbUser.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaBriefcase className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Job Title</p>
                            <p className="font-semibold text-lg">{dbUser.jobTitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaGraduationCap className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Education</p>
                            <p className="font-semibold text-lg whitespace-pre-wrap">{dbUser.education}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaFileAlt className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Experience</p>
                            <p className="font-semibold text-lg">{dbUser.experience}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaFileAlt className="text-purple-500 dark:text-purple-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Bio</p>
                            <p className="font-semibold text-lg">{dbUser.bio}</p>
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaKey className="text-yellow-500" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">OTP Code</p>
                            <p className="font-semibold text-lg">{dbUser.otpCode}</p>
                        </div>
                    </div> */}

                    {/* <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl"><FaCalendarAlt className="text-gray-500 dark:text-gray-400" /></div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">OTP Expiry</p>
                            <p className="font-semibold text-lg">{new Date(dbUser.otpExpiresAt).toLocaleString()}</p>
                        </div>
                    </div> */}

                    <Link to="/dashboard/update-profile">
                        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                            <div className="text-2xl"><CiSettings className="text-gray-500 dark:text-gray-400" /></div>
                            <h1 className='font-bold'>Update Profile</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
