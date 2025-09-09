import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiMenu, FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import { FaBookReader, FaUserCircle, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../../Content/Authcontext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DropdownItem = ({ icon, label, sidebarOpen, subLinks = [] }) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => {
        if (sidebarOpen) setOpen(!open);
    };

    return (
        <div className="relative group w-full">
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-[#00132f] p-3 rounded-lg transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    {sidebarOpen && (
                        <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
                    )}
                </div>
                {sidebarOpen && (
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {open ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                )}
            </div>

            <AnimatePresence>
                {sidebarOpen && open && (
                    <motion.div
                        className="pl-10 flex flex-col gap-2 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {subLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.to}
                                className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#00baff] transition-colors duration-200"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StudentDashboard = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Fetch user from API
        const fetchUser = async () => {
            try {
                if (user?.email) {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
                    const data = await res.json();
                    const singleUser = data.data.find(u => u.email === user.email);
                    setDbUser(singleUser);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();

        // Load theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, [user]);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!dbUser) return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">No user found.</p>;

    const profileImage = dbUser.photo || dbUser.image || `https://ui-avatars.com/api/?name=${dbUser.name}`;


    const handleLogout = async () => {
        try {
            await signOutUser(); // AuthContext theke logout
            setDbUser(null); // UI clear

            // Stylish compact SweetAlert
            Swal.fire({
                title: '👋 Logged out!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
                background: 'linear-gradient(135deg, #42275a, #734b6d)', // unique gradient
                color: '#fff',
                padding: '1.5rem',
                iconColor: '#ff6b6b',
                toast: true,
                position: 'top-end'
            }).then(() => {
                navigate("/login"); // redirect to login page after Swal closes
            });
        } catch (err) {
            toast.error("Logout failed");
            console.error(err);
        }
    };


    return (
        <div className={`${darkMode ? "dark" : ""} font-montserrat`}>
            <div className="flex h-screen bg-gray-50 dark:bg-[#00091a] text-gray-900 dark:text-gray-100 relative">
                {/* Sidebar */}
                <aside
                    className={`transition-all duration-700 bg-white dark:bg-[#00091a] shadow-xl h-screen ${sidebarOpen ? "w-56" : "md:w-20  w-0"
                        } fixed md:static top-0 left-0 z-50 overflow-y-auto`}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between p-4">
                        {sidebarOpen && (
                            <Link to="/">
                                <div className="w-36 h-[50px] flex items-center">
                                    <img
                                        src="https://i.ibb.co.com/v6c6bv8w/2e8737d8-8837-4936-aaae-723c2fa0c1e0.jpg"
                                        alt="Logo Light"
                                        className="block dark:hidden w-full h-full object-contain"
                                    />
                                    <img
                                        src="https://i.ibb.co/cKzQyBNk/534732164-2212940409145293-5451801233054972764-n.jpg"
                                        alt="Logo Dark"
                                        className="hidden dark:block w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-600 dark:text-gray-300 text-2xl"
                        >
                            {sidebarOpen ? <FiChevronDown /> : <FiMenu />}
                        </button>
                    </div>

                    {/* 🆕 Profile Section */}
                    {sidebarOpen && (
                        <div className="flex flex-col items-center text-center px-4 py-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                                <img src={profileImage} alt={dbUser.name} className="w-full h-full object-cover" />
                                <span
                                    className={`absolute bottom-3 right-3 w-6 h-6 rounded-full border-2 border-gray-900 ${dbUser.status === 'active' ? 'bg-green-400 animate-ping' : 'bg-red-500'
                                        }`}
                                ></span>
                            </div>
                            <h2 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 truncate w-full mt-3">
                                {dbUser.name}
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                {dbUser.role || "Student"}
                            </p>
                        </div>
                    )}

                    {/* Nav Items */}
                    <nav className="mt-4">
                        <ul className="space-y-1 text-sm">
                            <li>
                                <NavLink
                                    to="user-home"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? "text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#00132f]"
                                        }`
                                    }
                                >
                                    <span className="text-base"><FiHome /></span>
                                    {sidebarOpen && <span>Dashboard</span>}
                                </NavLink>
                            </li>

                            <DropdownItem
                                icon={<FaBookReader />}
                                label="Courses"
                                sidebarOpen={sidebarOpen}
                                subLinks={[{ label: "My Courses", to: "purchase-course" }]}
                            />

                            <li>
                                <NavLink
                                    to="student-profile"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? "text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#00132f]"
                                        }`
                                    }
                                >
                                    <span className="text-base"><FaCog /></span>
                                    {sidebarOpen && <span>Settings</span>}
                                </NavLink>
                            </li>

                            <hr className="border mt-5 dark:border-gray-50 opacity-50 border-blue-400 " />

                             <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? "text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#00132f]"
                                        }`
                                    }
                                >
                                    <span className="text-base"><FaHome /></span>
                                    {sidebarOpen && <span>Home</span>}
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </aside>

                {/* Sidebar toggle button (mobile) */}
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden absolute top-4 left-4 text-2xl z-50 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#00091a] p-2 rounded-full shadow"
                    >
                        <FiMenu />
                    </button>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
                    {/* Header */}
                    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#00091a] shadow-lg">
                        <div className="relative w-56">
                            <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none text-sm border border-transparent focus:border-[#00baff] transition"
                            />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4 md:gap-6">
                            <button onClick={toggleTheme} className="text-xl text-gray-600 dark:text-gray-300 hover:text-[#00baff] dark:hover:text-[#00baff] transition">
                                {darkMode ? <HiSun /> : <HiMoon />}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center gap-3 group"
                                >
                                    {/* Profile Image */}
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                                        <img src={profileImage} alt={dbUser?.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Name & Role next to image */}
                                    <div className="hidden sm:flex flex-col text-sm font-medium text-gray-700 dark:text-gray-200">
                                        <span>{dbUser?.name || "User"}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{dbUser?.role || "Student"}</span>
                                    </div>
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {profileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-52 bg-white/95 dark:bg-[#00132f]/95 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 backdrop-blur-md overflow-hidden"
                                        >
                                            <Link
                                                to="student-profile"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-[#00baff]/10 transition"
                                            >
                                                <FaUserCircle className="text-lg text-[#00baff]" /> Profile
                                            </Link>
                                         
                                            <hr className="border-t dark:border-gray-700" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition"
                                            >
                                                <FaSignOutAlt className="text-lg" /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-[#00091a] p-4 md:p-3 transition-colors duration-300">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
