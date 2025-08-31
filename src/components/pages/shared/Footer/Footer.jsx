import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';
import { FaGithubAlt, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

const paymentLogos = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOK-ExH64w4vaz6r2HY7kpEc0SEZKmpq7CKg&s',
    'https://www.shutterstock.com/image-vector/vinnytsia-ukraine-september-04-2023-260nw-2357100277.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/960px-American_Express_logo_%282018%29.svg.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdXUkLNEUaZEeKsN7vruOyzKJf7qxFRY2-BA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnAM5B6kXsn8-mJXp4bMwUE1tK5SVB1D8TA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkvIJELJ5mEGZCQE0tzsovNo8m2LfumnAhJg&s',
    'https://download.logo.wine/logo/BKash/BKash-Logo.wine.png',
    'https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png',
    'https://images.seeklogo.com/logo-png/35/1/mutual-trust-bank-limited-logo-png_seeklogo-356798.png',
    'https://images.seeklogo.com/logo-png/26/1/brac-bank-logo-png_seeklogo-260716.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFnrT084PQVHd4rRjw06evyCe7WjcqbxM-CA&s',
];


const navItems = [
    { name: "Verify Certificate", path: "/verify-certificate" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Privacy & Policy", path: "/privacy-and-policy" },
    { name: "Refund Policy", path: "/refund-and-policy" },
];

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 dark:bg-[#00091a] dark:text-gray-300 transition-colors duration-500 px-6 md:px-4 py-14 text-sm">
            <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Logo and Links */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-[150px] max-sm:w-[130px] h-[50px] bg-no-repeat bg-contain bg-center
                  bg-[url('https://inceptionbd.com/store/1/Untitled%20design%20(3).png')]
                  dark:bg-[url('https://i.ibb.co/cKzQyBNk/534732164-2212940409145293-5451801233054972764-n.jpg')]">
                        </div>

                    </div>

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
                    </nav>

                    <div className="flex gap-5 mt-6 text-xl text-gray-600 dark:text-gray-300">
                        <a
                            href="https://www.facebook.com/inceptionforfuture"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition"
                        >
                            <FaFacebookF />
                        </a>



                        <a
                            href="https://www.youtube.com/@inceptionbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-500 transition"
                        >
                            <FaYoutube />
                        </a>

                        <a
                            href="https://www.linkedin.com/company/inceptionbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <FaLinkedinIn />
                        </a>

                        <a
                            href="https://x.com/Inceptionbd2024?t=tQ9mS9JEBUBtQrJnU2nxKQ&s=09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-400 transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://x.com/Inceptionbd2024?t=tQ9mS9JEBUBtQrJnU2nxKQ&s=09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-400 transition"
                        >
                            <FaGithubAlt />
                        </a>
                    </div>
                </div>

                {/* Payment Section */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Pay With</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        {paymentLogos.map((logo, i) => (
                            <div
                                key={i}
                                className="w-16 h-16 bg-gray-100 dark:bg-white rounded-xl p-2 flex items-center justify-center shadow-sm hover:shadow-md transition duration-300"
                            >
                                <img
                                    src={logo}
                                    alt="Payment Logo"
                                    className="max-w-full max-h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <hr className="my-10 border-gray-300 dark:border-gray-700" />

            {/* Bottom */}
            <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600 dark:text-gray-400 gap-4">
                <p>© 2025 Inception BD. All rights reserved.</p>
                <div className="flex flex-wrap gap-4 font-medium">
                    {['Supported Browsers', 'Terms & Conditions', 'Refund Policy', 'Privacy Policy'].map(
                        (text, idx) => (
                            <span
                                key={idx}
                                className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                            >
                                {text}
                            </span>
                        )
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
