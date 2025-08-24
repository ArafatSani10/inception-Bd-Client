import React, { useState } from 'react';

const VideoSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const videoId = '778mo5m0r4o';
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative w-full py-16 overflow-hidden">
            {/* Title Section */}
            <div className="text-center mb-10 px-4">
                <h2 className="text-xl sm:text-5xl font-bold text-[#00baff] dark:text-[#00baff] mb-3">
                    ✨Watch Our Latest Feature
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                    Dive into our newest release—crafted with innovation and cinematic beauty.
                </p>
            </div>

            {/* Full-width Video Thumbnail */}
            <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden">
                <img
                    src={thumbnailUrl}
                    alt="Video Thumbnail"
                    className="w-full h-[220px] sm:h-[300px] md:h-[450px] lg:h-[550px] object-cover"
                />

                {/* Play Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="bg-white dark:bg-[#121212] bg-opacity-70 dark:bg-opacity-60 backdrop-blur-md rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-xl hover:scale-110 transition duration-300">
                        <svg
                            className="w-10 h-10 text-black dark:text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M6 4l10 6-10 6V4z" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* Video Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm px-4"
                    onClick={closeModal} // Clicking outside closes modal
                >
                    <div
                        className="relative w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on video
                    >
                        {/* Embedded Video */}
                        <div className="relative pt-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="Featured Video"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoSection;
