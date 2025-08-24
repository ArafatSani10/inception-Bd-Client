import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Extract YouTube video ID from URL
const getYouTubeId = (url) => {
    try {
        const regExp =
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    } catch {
        return null;
    }
};

const Podcast = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    // Example podcast data with YouTube URLs
    const podcasts = [
        {
            id: 1,
            title: 'The Future of Web3',
            host: 'John Doe',
            videoUrl: 'https://www.youtube.com/watch?v=TmMRaGykbUQ',
            description: 'A deep dive into Web3 technology and its impact.',
        },
        {
            id: 2,
            title: 'AI in Everyday Life',
            host: 'Jane Smith',
            videoUrl: 'https://www.youtube.com/watch?v=TmMRaGykbUQ',
            description: 'How AI is shaping the future of work and play.',
        },
        {
            id: 3,
            title: 'Design Trends 2025',
            host: 'Emily Johnson',
            videoUrl: 'https://www.youtube.com/watch?v=TmMRaGykbUQ',
            description: 'Exploring upcoming design trends and tips.',
        },
        {
            id: 4,
            title: 'Digital Marketing Secrets',
            host: 'Michael Lee',
            videoUrl: 'https://www.youtube.com/watch?v=TmMRaGykbUQ',
            description: 'Unlocking strategies for modern marketing.',
        },
    ];

    const openVideo = (videoUrl) => {
        const id = getYouTubeId(videoUrl);
        if (id) setActiveVideo(id);
    };
    const closeVideo = () => setActiveVideo(null);

    return (
        <div className="relative py-16  bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-950 overflow-hidden">
            {/* Background Blurs */}
            <div className="absolute top-16 left-12 w-32 h-32 rounded-full bg-purple-400/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-16 right-12 w-40 h-40 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none"></div>

            <div className="max-w-full mx-auto relative z-10">
                {/* Header */}
                <motion.h2
                    className="text-xl md:text-5xl font-semibold text-center bg-clip-text text-[#00baff] bg-gradient-to-r from-purple-600 to-indigo-500  mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    🎙️Learn Smarter  Our Podcasts
                </motion.h2>

                <motion.p
                    className="text-sm md:text-lg   text-center bg-clip-text text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:bg-[#00091a] mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    Quick tips and stories to boost your course automation skills.
                </motion.p>

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
                    autoplay={{ delay: 7000, disableOnInteraction: false }}
                    loop
                    className="podcast-swiper pb-16"
                    navigation={false}
                >
                    {podcasts.map(({ id, title, host, videoUrl, description }) => {
                        const videoId = getYouTubeId(videoUrl);
                        if (!videoId) return null;
                        return (
                            <SwiperSlide key={id}>
                                <motion.div
                                    className="bg-white dark:bg-[#00091a] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer flex flex-col h-full"
                                    whileHover={{ y: -8, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openVideo(videoUrl)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') openVideo(videoUrl);
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                            alt={`${title} podcast thumbnail`}
                                            className="w-full h-full object-cover filter brightness-90 transition-transform duration-300 hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                aria-label={`Play podcast video: ${title}`}
                                                className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
                                            >
                                                <FaPlay className="text-white ml-1" size={22} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                                        <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{host}</p>
                                        <p className="text-gray-700 dark:text-gray-300 flex-grow line-clamp-3">{description}</p>
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
                            title="Podcast Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full rounded-xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Podcast;
