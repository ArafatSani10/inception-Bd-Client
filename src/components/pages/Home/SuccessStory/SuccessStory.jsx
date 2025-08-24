import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FaPlay, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Helper: extract YouTube video ID from any valid URL
const getYouTubeId = (url) => {
    try {
        const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    } catch {
        return null;
    }
};

const SuccessStory = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    // Example data with full YouTube URLs now
    const successStories = [
        {
            id: 1,
            name: "Sarah Johnson",
            batch: "Web Development Batch 2023",
            videoUrl: "https://www.youtube.com/watch?v=7m_eUv1woDo&t=3287s",
            quote: "This course transformed my career from retail to tech in just 6 months!",
        },
        {
            id: 2,
            name: "Michael Chen",
            batch: "Data Science Batch 2022",
            videoUrl: "https://www.youtube.com/watch?v=7m_eUv1woDo&t=3287s",
            quote: "Landed my dream job at Google after completing the program.",
        },
        {
            id: 3,
            name: "Priya Sharma",
            batch: "UX Design Batch 2023",
            videoUrl: "https://www.youtube.com/watch?v=7m_eUv1woDo&t=3287s",
            quote: "Tripled my freelance income with skills learned here.",
        },
        {
            id: 4,
            name: "David Wilson",
            batch: "Digital Marketing Batch 2022",
            videoUrl: "https://www.youtube.com/watch?v=7m_eUv1woDo&t=3287s",
            quote: "Started my own agency with just $100 and now making 6 figures.",
        },
    ];

    const openVideo = (videoUrl) => {
        const id = getYouTubeId(videoUrl);
        if (id) setActiveVideo(id);
    };
    const closeVideo = () => setActiveVideo(null);

    return (
        <div className="relative py-20   bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-950 overflow-hidden">
            {/* Decorative Background Blurs */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>

            <div className="max-w-full mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-xl md:text-5xl font-bold bg-clip-text text-[#00baff] bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        ✅Student Success Stories
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Hear directly from our students about their transformative learning journeys
                    </motion.p>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    loop
                    className="success-swiper pb-16"
                    navigation={false}  // explicitly no nav buttons
                >
                    {successStories.map(({ id, name, batch, videoUrl, quote }) => {
                        const videoId = getYouTubeId(videoUrl);
                        if (!videoId) return null;

                        return (
                            <SwiperSlide key={id}>
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer"
                                    whileHover={{ y: -10, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openVideo(videoUrl)}
                                >
                                    {/* Video Thumbnail with overlay */}
                                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                            alt={`${name} video thumbnail`}
                                            className="w-full h-full object-cover filter brightness-90 transition-transform duration-300 hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                aria-label={`Play video of ${name}`}
                                                className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition-colors"
                                            >
                                                <FaPlay className="text-white ml-1" size={22} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quote Section */}
                                    <div className="p-4">
                                        <div className="flex items-center mb-2 text-teal-500">
                                            <FaQuoteLeft />
                                            <p className="ml-2 italic text-sm line-clamp-3 text-gray-700 dark:text-gray-300">{quote}</p>
                                        </div>

                                        {/* Student Info */}
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
                                        <p className="text-teal-500 dark:text-teal-400 font-medium">{batch}</p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div
                    onClick={closeVideo}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        onClick={closeVideo}
                        aria-label="Close video"
                        className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition"
                    >
                        &times;
                    </button>
                    <div className="relative w-full max-w-4xl aspect-video rounded-xl shadow-2xl">
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                            title="Student Success Story"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full rounded-xl"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuccessStory;
