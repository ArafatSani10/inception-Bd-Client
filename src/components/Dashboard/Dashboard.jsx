
import React, { useContext, useEffect, useState } from 'react';
import {
    FiHome, FiShoppingBag, FiUsers, FiSearch, FiBell,
    FiMessageSquare, FiChevronsLeft, FiChevronDown, FiChevronUp, FiMenu
} from 'react-icons/fi';
import { FaBlog, FaCertificate, FaChalkboardTeacher, FaCog, FaGraduationCap, FaLock, FaRegUser, FaSignOutAlt, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaUsersGear } from 'react-icons/fa6';
import { TbBrandCoinbase } from 'react-icons/tb';
import { HiSun, HiMoon } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import AuthContext from '../../Content/Authcontext';
import axios from 'axios';

const DropdownItem = ({ icon, label, sidebarOpen, subLinks = [] }) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => { if (sidebarOpen) setOpen(!open); };

    return (
        <div className="relative group w-full">
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-md transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    {sidebarOpen && <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>}
                </div>
                {sidebarOpen && <span className="text-sm text-gray-600 dark:text-gray-300">{open ? <FiChevronUp /> : <FiChevronDown />}</span>}
            </div>

            {!sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-2 ml-2 z-50 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 border border-gray-200 dark:border-gray-700 hidden group-hover:block"
                >
                    <div className="text-sm font-semibold mb-1 text-gray-800 dark:text-white">{label}</div>
                    <ul className="flex flex-col gap-1">
                        {subLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                            >
                                {link.label}
                                {link.count !== undefined && (
                                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 px-2 py-0.5 rounded-full">
                                        {link.count}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </ul>
                </motion.div>
            )}

            <AnimatePresence>
                {sidebarOpen && open && (
                    <motion.div
                        className="pl-10 flex flex-col gap-2 mt-2 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {subLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="text-xs text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200"
                            >
                                {link.label}
                                {link.count !== undefined && (
                                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 px-2 py-0.5 rounded-full">
                                        {link.count}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [open, setOpen] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                if (user?.email) {
                    const res = await axios.get(`http://localhost:5000/api/v1/users`);
                    // Filter single user by email
                    const singleUser = res.data.data.find(u => u.email === user.email);
                    setDbUser(singleUser);
                }
            } catch (err) {
                console.error("Failed to fetch user role:", err);
            }
        };
        fetchUserRole();
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

    return (
        <div className={`${darkMode ? 'dark' : ''} font-montserrat`}>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
                {/* Sidebar */}
                <aside className={`transition-all duration-700 bg-white dark:bg-gray-900 shadow-xl h-screen ${sidebarOpen ? 'w-60' : 'w-20'} fixed md:static top-0 left-0 z-50 overflow-y-auto scrollbar-hide ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="flex items-center justify-between p-4">
                        {sidebarOpen && (
                            <Link to="/">
                                <div className="w-36 h-[50px] bg-no-repeat bg-contain bg-left
                    bg-[url('https://inceptionbd.com/store/1/Untitled%20design%20(3).png')]
                    dark:bg-[url('https://i.ibb.co/cKzQyBNk/534732164-2212940409145293-5451801233054972764-n.jpg')]"></div>
                            </Link>
                        )}
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 dark:text-gray-300 text-2xl">
                            <FiChevronsLeft />
                        </button>
                    </div>

                    <nav className="mt-4">
                        <ul className="space-y-1 text-sm">
                            <li className="relative group">
                                <NavLink
                                    to="admin-home"
                                    className={({ isActive }) => `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${isActive ? ' text-[#00baff] shadow-md font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    <span className="text-base"><FiHome /></span>
                                    {sidebarOpen && <span className="whitespace-nowrap">Dashboard</span>}
                                </NavLink>
                            </li>

                            {sidebarOpen && <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">Manage Content</li>}

                            <DropdownItem
                                icon={<FaGraduationCap />}
                                label="Manage Courses"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "Courses List", to: "courses-list" },
                                    { label: "Add Course", to: "course-form" },
                                    { label: "Categories", to: "categories" },
                                    { label: "Add Categories", to: "add-category" },
                                ]}
                            />

                            <li>
                                <NavLink to="certificate" className={({ isActive }) => `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <span className="text-base"><FaCertificate /></span>
                                    {sidebarOpen && <span>Certificate Builder</span>}
                                </NavLink>
                            </li>

                            <DropdownItem
                                icon={<FaBlog />}
                                label="Manage Blogs"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "Blog List", to: "post-list" },
                                    { label: "Add-Blog", to: "create-post" },
                                ]}
                            />

                            {sidebarOpen && <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">Manage Orders</li>}

                            <DropdownItem
                                icon={<FaLock />}
                                label="Manage Order"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "Order History", to: "orderhistory" },
                                    { label: "Pending Payment", to: "pending-order", count: 2 },
                                ]}
                            />

                            <DropdownItem
                                icon={<FaWallet />}
                                label="Withdraw Payment"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "Withdraw Method", to: "withdraw-method" },
                                    { label: "Withdraw List", to: "withdraw-list" },
                                ]}
                            />

                            {sidebarOpen && <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">Manage Users</li>}

                            <DropdownItem
                                icon={<FaUsersGear />}
                                label="Manage Users"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "All Student", to: "all-student" },
                                    { label: "Instructor", to: "all-instructor" },
                                    { label: "Active Users", to: "active-user" },
                                    { label: "Non Verified", to: "non-verified" },
                                    { label: "Banned User", to: "banned-users" },
                                    { label: "Send Bulk Mail", to: "bulk-mail" },
                                ]}
                            />

                            {sidebarOpen && <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">Site content</li>}

                            <li>
                                <NavLink to="Brand-List" className={({ isActive }) => `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? ' text-[#00baff] shadow-md font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <span className="text-base"><TbBrandCoinbase /></span>
                                    {sidebarOpen && <span>Brand</span>}
                                </NavLink>
                            </li>

                            {sidebarOpen && <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">Settings</li>}

                            <li>
                                <NavLink to="/setting" className={({ isActive }) => `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <span className="text-base"><IoSettings /></span>
                                    {sidebarOpen && <span>Setting</span>}
                                </NavLink>
                            </li>




                          

                            {/* ---- Student Section (Always Last) ---- */}
                            {dbUser?.role === "student" && (
                                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex-col justify-center items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                        {user?.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Student Avatar"
                                                className="w-32 h-32 mx-auto rounded-full border-2 border-indigo-400"
                                            />
                                        ) : (
                                            <FaUserCircle className="text-indigo-600 dark:text-indigo-300 text-3xl" />
                                        )}

                                        {sidebarOpen && (
                                            <div>
                                                <p className="font-semibold text-center text-sm text-gray-800 mt-5 dark:text-white">
                                                    {user?.displayName || dbUser?.name}
                                                </p>
                                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                                    {dbUser?.role}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <ul className='space-y-1 text-sm'>
                                        <li className="relative group">
                                            <NavLink
                                                to="user-home"
                                                className={({ isActive }) => `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${isActive ? ' text-[#00baff] shadow-md font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                            >
                                                <span className="text-base"><FiHome /></span>
                                                {sidebarOpen && <span className="whitespace-nowrap">Dashboard</span>}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </ul>
                    </nav>
                </aside>

                {!sidebarOpen && (
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden absolute top-4 left-4 text-2xl z-50 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                        <FiMenu />
                    </button>
                )}

                <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
                    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
                        <div className="relative w-64">
                            <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
                            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none text-sm" />
                        </div>

                        <div className="flex items-center gap-4 md:gap-6">
                            <button onClick={toggleTheme} className="text-xl text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition" title="Toggle Theme">
                                {darkMode ? <HiSun /> : <HiMoon />}
                            </button>

                            <div className="relative">
                                <button onClick={() => setOpen(!open)} className="flex items-center gap-3 group">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-indigo-400 group-hover:scale-105 transition" />
                                    ) : (
                                        <FaUserCircle className="text-indigo-600 dark:text-indigo-300 text-3xl group-hover:scale-110 transition" />
                                    )}
                                    <div className="max-sm:flex-col md:block text-left">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{user?.displayName || dbUser?.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{dbUser?.role}</p>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {open && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-52 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 backdrop-blur-md overflow-hidden"
                                        >
                                            <Link to="profile" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-700/50 transition">
                                                <FaUserCircle className="text-lg text-indigo-500" /> Profile
                                            </Link>
                                            <a href="/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-700/50 transition">
                                                <FaCog className="text-lg text-indigo-500" /> Settings
                                            </a>
                                            <hr className="border-t dark:border-gray-700" />
                                            <button onClick={signOutUser} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition">
                                                <FaSignOutAlt className="text-lg" /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
