import React, { useContext, useEffect, useState } from "react";
import {
    FiHome,
    FiShoppingBag,
    FiUsers,
    FiSearch,
    FiBell,
    FiMessageSquare,
    FiChevronsLeft,
    FiChevronDown,
    FiChevronUp,
    FiMenu,
} from "react-icons/fi";
import {
    FaBlog,
    FaBookReader,
    FaCertificate,
    FaChalkboardTeacher,
    FaCog,
    FaGraduationCap,
    FaLock,
    FaRegUser,
    FaSignOutAlt,
    FaTicketAlt,
    FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaUsersGear } from "react-icons/fa6";
import { TbBrandCoinbase } from "react-icons/tb";
import { HiSun, HiMoon } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import AuthContext from "../../Content/Authcontext";
import axios from "axios";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MdViewModule } from "react-icons/md";

const DropdownItem = ({ icon, label, sidebarOpen, subLinks = [] }) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => {
        if (sidebarOpen) setOpen(!open);
    };

    return (
        <div className="relative group w-full">
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-md transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    {sidebarOpen && (
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                            {label}
                        </span>
                    )}
                </div>
                {sidebarOpen && (
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {open ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                )}
            </div>

            {!sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-2 ml-2 z-50 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 border border-gray-200 dark:border-gray-700 hidden group-hover:block"
                >
                    <div className="text-sm font-semibold mb-1 text-gray-800 dark:text-white">
                        {label}
                    </div>
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
                        animate={{ opacity: 1, height: "auto" }}
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
    const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const navigate = useNavigate();

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
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                    // Filter single user by email
                    const singleUser = res.data.data.find((u) => u.email === user.email);
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

    // const profileImage = dbUser.photo || dbUser.image || `https://ui-avatars.com/api/?name=${dbUser.name}`;

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
            console.error(err);
            toast.error(`Logout failed: ${err.message}`, { autoClose: 3000 });
        }
    };


    return (
        <div className={`${darkMode ? "dark" : ""} font-montserrat`}>
            <div className="flex h-screen bg-gray-50 dark:bg-[#00091a] text-gray-900 dark:text-gray-100 relative">
                {/* Sidebar */}
                <aside
                    className={`transition-all duration-700 bg-white dark:bg-gray-900 shadow-xl h-screen ${sidebarOpen ? "w-60" : "w-20"
                        } fixed md:static top-0 left-0 z-50 overflow-y-auto scrollbar-hide ${sidebarOpen ? "block" : "hidden md:block"
                        }`}
                >
                    <div className="flex items-center justify-between p-4">
                        {sidebarOpen && (
                            <Link to="/">
                                <div
                                    className="w-36 h-[50px] bg-no-repeat bg-contain bg-left
                    bg-[url('https://i.ibb.co/v6c6bv8w/2e8737d8-8837-4936-aaae-723c2fa0c1e0.jpg')]
                    dark:bg-[url('https://i.ibb.co/cKzQyBNk/534732164-2212940409145293-5451801233054972764-n.jpg')]"
                                ></div>
                            </Link>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-600 dark:text-gray-300 text-2xl"
                        >
                            <FiChevronsLeft />
                        </button>
                    </div>

                    <nav className="mt-4">
                        <ul className="space-y-1 text-sm">
                            <li className="relative group">
                                <NavLink
                                    to="admin-home"
                                    className={({
                                        isActive,
                                    }) => `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${isActive
                                            ? " text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <span className="text-base">
                                        <FiHome />
                                    </span>
                                    {sidebarOpen && (
                                        <span className="whitespace-nowrap">Dashboard</span>
                                    )}
                                </NavLink>
                            </li>

                            {sidebarOpen && (
                                <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">
                                    Manage Content
                                </li>
                            )}

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

                            {/* <DropdownItem
                                icon={<FaGraduationCap />}
                                label="Manage Module"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "Module Upload", to: "module-upload" },
                                    // { label: "Module Course", to: "course-form" },
                                    // { label: "Categories", to: "categories" },
                                    // { label: "Add Categories", to: "add-category" },
                                ]}
                            /> */}

                            <li>
                                <NavLink
                                    to="module-upload"
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? " text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <span className="text-base">
                                        <MdViewModule />
                                    </span>
                                    {sidebarOpen && <span>Module Upload</span>}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="certificate"
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? " text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <span className="text-base">
                                        <FaCertificate />
                                    </span>
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

                            {sidebarOpen && (
                                <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">
                                    Manage Orders
                                </li>
                            )}

                            <DropdownItem
                                icon={<FaLock />}
                                label="Manage Order"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "Order History", to: "orderhistory" },
                                    // { label: "Pending Payment", to: "pending-order", count: 2 },
                                ]}
                            />

                            

                            <li>
                                <NavLink
                                    to="cupon"
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? " text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <span className="text-base">
                                        <FaTicketAlt />
                                    </span>
                                    {sidebarOpen && <span>Cupon Card</span>}
                                </NavLink>
                            </li>

                            {sidebarOpen && (
                                <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">
                                    Manage Users
                                </li>
                            )}

                            <DropdownItem
                                icon={<FaUsersGear />}
                                label="Manage Users"
                                sidebarOpen={sidebarOpen}
                                subLinks={[
                                    { label: "All Student", to: "all-student" },
                                    { label: "Instructor", to: "all-instructor" },
                                    { label: "Active Users", to: "active-user" },
                                    // { label: "Non Verified", to: "non-verified" },
                                    // { label: "Banned User", to: "banned-users" },
                                    // { label: "Send Bulk Mail", to: "bulk-mail" },
                                ]}
                            />

                            {sidebarOpen && (
                                <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">
                                    Site content
                                </li>
                            )}

                            <li>
                                <NavLink
                                    to="Brand-List"
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? " text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <span className="text-base">
                                        <TbBrandCoinbase />
                                    </span>
                                    {sidebarOpen && <span>Brand</span>}
                                </NavLink>
                            </li>

                            {sidebarOpen && (
                                <li className="text-xs text-gray-400 dark:text-gray-500 py-4 px-3 tracking-wide uppercase">
                                    Settings
                                </li>
                            )}

                            <li>
                                <NavLink
                                    to="/dashboard/update-profile"
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                                            ? " text-[#00baff] shadow-md font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <span className="text-base">
                                        <IoSettings />
                                    </span>
                                    {sidebarOpen && <span>Setting</span>}
                                </NavLink>
                            </li>

                        
                        </ul>
                    </nav>
                </aside>

                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden absolute top-4 left-4 text-2xl z-50 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
                    >
                        <FiMenu />
                    </button>
                )}

                <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
                    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
                        <div className="relative w-64">
                            <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-4 md:gap-6">
                            <button
                                onClick={toggleTheme}
                                className="text-xl text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                                title="Toggle Theme"
                            >
                                {darkMode ? <HiSun /> : <HiMoon />}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-3 group"
                                >
                                    {/* Profile Image */}
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                                        <img src={dbUser?.photo} alt={dbUser?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="max-sm:flex-col md:block text-left">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">
                                            {dbUser?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {dbUser?.role}
                                        </p>
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
                                            <Link
                                                to="profile"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-700/50 transition"
                                            >
                                                <FaUserCircle className="text-lg text-indigo-500" />{" "}
                                                Profile
                                            </Link>
                                            <a
                                                href="/settings"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-700/50 transition"
                                            >
                                                <FaCog className="text-lg text-indigo-500" /> Settings
                                            </a>
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

                    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
