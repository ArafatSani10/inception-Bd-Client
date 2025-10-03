import React, { useState, useRef, useEffect } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';

// Generates a random 6-digit string
const generateCaptcha = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Draw captcha with lines in an SVG element
const CaptchaSVG = ({ captcha, width = 150, height = 50 }) => {
    const chars = captcha.split('');
    const charSpacing = width / (chars.length + 1);

    // Generate random lines for "dag kata"
    const randomLines = Array.from({ length: 6 }, () => ({
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
        strokeWidth: 1 + Math.random() * 1.5,
    }));

    return (
        <svg
            width={width}
            height={height}
            style={{ userSelect: 'none', background: 'white', borderRadius: 10 }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Captcha chars with random rotate and position */}
            {chars.map((char, idx) => {
                const x = charSpacing * (idx + 1);
                const y = height / 2 + (Math.random() - 0.5) * 10;
                const rotate = (Math.random() - 0.5) * 30;
                const fontSize = 28 + Math.random() * 8;

                return (
                    <text
                        key={idx}
                        x={x}
                        y={y}
                        fontSize={fontSize}
                        fontWeight="bold"
                        fill="#6b21a8"
                        style={{
                            transformOrigin: `${x}px ${y}px`,
                            transform: `rotate(${rotate}deg)`,
                            fontFamily: 'monospace',
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }}
                    >
                        {char}
                    </text>
                );
            })}

            {/* Draw random crossing lines over the captcha */}
            {randomLines.map((line, idx) => (
                <line
                    key={idx}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#8b5cf6"
                    strokeWidth={line.strokeWidth}
                    strokeLinecap="round"
                    opacity={0.6}
                />
            ))}
        </svg>
    );
};

const ContactUs = () => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agree) {
            setError('You must agree to the terms & rules.');
            return;
        }
        if (captchaInput !== captcha) {
            setError('Captcha does not match. Please try again.');
            refreshCaptcha();
            return;
        }
        setError('');
        // alert('Form submitted successfully!');
    };

    return (
        <div className="min-h-screen max-w-full mx-auto bg-gradient-to-br from-[#f0f7ff] to-[#e6f0ff] dark:from-gray-950 dark:to-gray-950 text-gray-800 dark:text-gray-200 py-16 px-4 sm:px-6 font-montserrat">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl mt-12 md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-[#00baff] animate-gradient-x">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        We'd love to hear from you! Reach out to us with any questions or feedback.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side: Map + Info */}
                    <div className="space-y-20">
                        {/* Map */}
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700">
                            <iframe
                                className="w-full h-72 lg:h-[600px] grayscale-[40%] hover:grayscale-0 transition duration-500"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.684373997991!2d89.14408811543796!3d23.88727338492971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe97255b9e461b%3A0xb81541865a28a5d2!2sInception%20Office%2C%20Lahini%20Bottola%2C%20Domdom%20Sharok%2C%20Kushtia%207001%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1693999999999!5m2!1sen!2sbd"
                                allowFullScreen
                                loading="lazy"
                                title="Inception Office Map"
                            ></iframe>
                        </div>


                        {/* Info Card */}
                        <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
                            <h2 className="text-2xl font-bold text-[#00baff] dark:text-[#00baff]">Our Information</h2>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="text-2xl p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                                    <IoLocationSharp />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Our Location</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        111 no House, Domdom sharok, Lahini Bot Tola, Kushtia - 7001
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="text-2xl p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">📞</div>
                                <div>
                                    <h3 className="font-semibold text-lg">Phone Number</h3>
                                    <p className="text-gray-600 dark:text-gray-300">+880 1736-384167</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="text-2xl p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                                    <MdEmail />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Address</h3>
                                    <p className="text-gray-600 dark:text-gray-300">learn.inception@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#00baff] dark:text-[#00baff] mb-2">Send Us a Message</h2>
                            <p className="text-gray-600 dark:text-gray-300">Fill out the form below and we’ll get back to you soon.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {['Full Name', 'Email Address', 'Subject'].map((label, i) => (
                                <div key={i} className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                                    <input
                                        type={label === 'Email Address' ? 'email' : 'text'}
                                        placeholder={
                                            label === 'Full Name'
                                                ? 'John Doe'
                                                : label === 'Email Address'
                                                    ? 'john@example.com'
                                                    : 'Type your subject'
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/70 focus:ring-2 focus:ring-blue-400 outline-none"
                                        required
                                    />
                                </div>
                            ))}

                            {/* Message */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Type your message here..."
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/70 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Captcha */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Captcha
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="Enter captcha"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        className="w-full sm:w-[400px] px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/70 focus:ring-2 focus:ring-blue-400 outline-none"
                                        required
                                        autoComplete="off"
                                    />
                                    <CaptchaSVG captcha={captcha} />
                                    <button
                                        type="button"
                                        onClick={refreshCaptcha}
                                        title="Refresh Captcha"
                                        className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-500 transition mt-2 sm:mt-0"
                                    >
                                        <FiRefreshCw />
                                    </button>
                                </div>
                            </div>


                            {/* Agree checkbox */}
                            <div className="mb-6 flex items-center">
                                <input
                                    id="agree"
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-[#00baff] focus:ring-[#00baff]"
                                />
                                <label
                                    htmlFor="agree"
                                    className="ml-3 block text-gray-700 dark:text-gray-300 text-sm cursor-pointer select-none"
                                >
                                    I agree with{' '}
                                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[#00baff]">
                                        terms & rules
                                    </a>
                                </label>
                            </div>

                            {/* Error message */}
                            {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

                            <button
                                type="submit"
                                className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-[#00baff] hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
