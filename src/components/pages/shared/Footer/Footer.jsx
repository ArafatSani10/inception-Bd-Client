import React from 'react';
import {
    FaFacebookF,
    FaYoutube,
    FaLinkedinIn,
} from 'react-icons/fa';
import { FaGithub, FaGithubAlt, FaTwitter } from 'react-icons/fa6';

const navItems = [
    { name: "Verify Certificate", path: "/verify-certificate" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Privacy & Policy", path: "/privacy-and-policy" },
    { name: "Refund Policy", path: "/refund-and-policy" },
];

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 dark:bg-[#00091a] dark:text-gray-300 transition-colors duration-500 px-6 md:px-4 py-14 text-sm">
            <div className="max-w-full mx-auto space-y-8">
                {/* Logo */}
                <div className="flex items-center">
                    <div
                        className="w-[150px] max-sm:w-[130px] h-[50px] bg-no-repeat bg-contain bg-center
            bg-[url('https://inceptionbd.com/store/1/Untitled%20design%20(3).png')]
            dark:bg-[url('https://i.ibb.co/cKzQyBNk/534732164-2212940409145293-5451801233054972764-n.jpg')]"
                    />
                </div>

                {/* Nav + Social */}
                <div className="flex items-center justify-between flex-wrap gap-6">
                    <nav className="flex flex-wrap gap-5 text-gray-600 dark:text-gray-400 font-medium">
                        {navItems.map((item, i) => (
                            <a
                                key={i}
                                href={item.path}
                                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
                            >
                                {item.name}
                            </a>

                            
                        ))}

                           <h1>Trade licence no - <span className='text-[#00baff]'>07127</span></h1>
                    </nav>

                 

                    <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-300">
                        <a
                            href="https://www.facebook.com/inceptionforfuture"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden
               bg-gray-200 dark:bg-gray-800 transition-colors duration-500 group"
                        >
                            <span
                                className="absolute inset-0 bg-blue-500 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"
                            />
                            <FaFacebookF className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-500" />
                        </a>

                        <a
                            href="https://www.youtube.com/@inceptionbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden
               bg-gray-200 dark:bg-gray-800 transition-colors duration-500 group"
                        >
                            <span
                                className="absolute inset-0 bg-red-500 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"
                            />
                            <FaYoutube className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-500" />
                        </a>

                        <a
                            href="https://www.linkedin.com/company/inceptionbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden
               bg-gray-200 dark:bg-gray-800 transition-colors duration-500 group"
                        >
                            <span
                                className="absolute inset-0 bg-blue-600 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"
                            />
                            <FaLinkedinIn className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-500" />
                        </a>

                        <a
                            href="https://x.com/Inceptionbd2024"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden
               bg-gray-200 dark:bg-gray-800 transition-colors duration-500 group"
                        >
                            <span
                                className="absolute inset-0 bg-sky-400 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"
                            />
                            <FaTwitter className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-500" />
                        </a>

                        <a
                            href="https://github.com/Inceptionbd2024"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden
               bg-gray-200 dark:bg-gray-800 transition-colors duration-500 group"
                        >
                            <span
                                className="absolute inset-0 bg-gray-500 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"
                            />
                            <FaGithub className="relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-500" />
                        </a>
                    </div>

                </div>

                {/* Payment Section */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        Pay With
                    </h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Light mode */}
                        <img
                            src="https://i.ibb.co.com/FbZ1yWRD/Screenshot-2025-09-02-133014.png"
                            alt="Pay With"
                            className="dark:hidden w-full h-auto"
                        />
                        {/* Dark mode */}
                        <img
                            src="https://i.ibb.co.com/hJ1VFVLR/Screenshot-2025-09-02-133149.png"
                            alt="Pay With"
                            className="hidden dark:block w-full h-auto"
                        />
                    </div>
                </div>

                <hr className="border-gray-300 dark:border-gray-700" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600 dark:text-gray-400 gap-4">
                    <p>© 2025 Inception BD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
