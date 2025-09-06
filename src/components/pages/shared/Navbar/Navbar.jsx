import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../../Content/Authcontext";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleUser, FaUser } from "react-icons/fa6";
import { SiLogmein } from "react-icons/si";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDashboard, MdLogout } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "enabled") setIsDarkMode(true);
    else if (saved === "disabled") setIsDarkMode(false);
    else
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  // Close dropdown/menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest("#mobile-menu-btn")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Instructors", href: "/instructors" },
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const getAvatarLetters = (user) => {
    if (!user) return "UU";
    if (user.photoURL) return "";
    if (user.displayName) return user.displayName.slice(0, 2).toUpperCase();
    if (user.email) return user.email.slice(0, 2).toUpperCase();
    return "UU";
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Successfully logged out!", { autoClose: 2000 });
    } catch (err) {
      console.error(err.message);
      toast.error(`Logout failed: ${err.message}`, { autoClose: 3000 });
    }
  };


  

  return (
    <>
      <ToastContainer position="top-right" />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#00091a] shadow-md transition-colors duration-500">
        <div className="mx-auto flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <div className="text-2xl font-extrabold select-none cursor-default">
            <Link to="/">
              <img
                className="max-sm:w-[130px] w-[150px]"
                src={
                  isDarkMode
                    ? "https://i.ibb.co/cKzQyBNk/534732164-2212940409145293-5451801233054972764-n.jpg"
                    : "https://i.ibb.co/v6c6bv8w/2e8737d8-8837-4936-aaae-723c2fa0c1e0.jpg"
                }
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-gray-700 dark:text-gray-300 font-semibold">
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                className="relative group hover:text-[#00baff] dark:hover:text-[#00baff] transition-colors duration-300 text-sm"
              >
                {name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#00baff] dark:bg-[#00baff] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* User Dropdown */}
            <div className="relative ml-6" ref={dropdownRef}>
              {user ? (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gradient-to-r from-purple-600 to-blue-500 transition-transform transform hover:scale-105"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-300 transition-transform transform hover:scale-105">
                      {getAvatarLetters(user)}
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md font-semibold hover:from-purple-700 hover:to-blue-600 transition transform hover:-translate-y-0.5 shadow-lg">
                    Login
                  </button>
                </Link>
              )}

              <AnimatePresence>
                {isDropdownOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email || ""}
                      </p>
                    </div>
                    {/* link to dashboard */}
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <MdDashboard className="text-gray-500 dark:text-gray-400" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <MdLogout className="text-gray-500 dark:text-gray-400" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {isDarkMode ? (
                <svg
                  className="h-6 w-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.485-9H21m-16 0H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-4 p-3">
            {user && (
              <div
                className="flex items-center cursor-pointer select-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gradient-to-r from-purple-600 to-blue-500"
                  />
                ) : (
                  <div className="w-10 h-10 -mb-1 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {getAvatarLetters(user)}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {isDarkMode ? (
                <svg
                  className="h-6 w-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.485-9H21m-16 0H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              )}
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {!isMenuOpen ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-14 right-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden md:hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email || ""}
                </p>
              </div>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <MdDashboard className="text-gray-500 dark:text-gray-400" />
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <MdLogout className="text-gray-500 dark:text-gray-400" />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Panel */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 pt-8 space-y-4 text-sm font-medium text-gray-700 dark:text-gray-300 h-full overflow-y-auto">
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white transition-all duration-300 ease-in-out"
              >
                {name}
              </Link>
            ))}

            {!user && (
              <Link to="/login">
                <button className="px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md font-semibold hover:from-purple-700 hover:to-blue-600 transition transform hover:-translate-y-0.5 shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
