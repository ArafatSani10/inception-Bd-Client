import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    const swiperRef = useRef(null);

    const podcasts = [
        {
            id: 1,
            title: 'Generative AI 101 in Bangla: What You Need to Know | Inception BD Podcast Ep 01',
            host: 'Inception BD',
            videoUrl: 'https://www.youtube.com/watch?v=TmMRaGykbUQ',
            // description: 'A deep dive into Web3 technology and its impact.',
        },
        {
            id: 2,
            title: 'The Rise of AI: How Its Transforming Healthcare and Personal Development',
            host: 'Inception BD',
            videoUrl: 'https://www.youtube.com/watch?v=Rz-A_CQn2gU&t=1682s',
            // description: 'How AI is shaping the future of work and play.',
        },
        {
            id: 3,
            title: ' AI Reshaping Data Teams: Prepare for the 2030 Job Market',
            host: 'Inception BD',
            videoUrl: 'https://www.youtube.com/watch?v=tvmm5GegYZQ&list=PLkz_y24mlSJaxfbAROjlkExKJIxSlI61L&index=7&t=47s',
            // description: 'How AI is shaping the future of work and play.',
        },
        {
            id: 4,
            title: ' Crack the Amazon Interview: Tips & Tricks for Success',
            host: 'Inception BD',
            videoUrl: 'https://www.youtube.com/watch?v=i9lyE2t7OyY&list=PLkz_y24mlSJaxfbAROjlkExKJIxSlI61L&index=7',
            // description: 'How AI is shaping the future of work and play.',
        },
        {
            id: 5,
            title: 'AI & Your Career: Opportunities, Challenges, and the Future Ahead | Inception BD podcast Ep 02',
            host: 'Inception BD',
            videoUrl: 'https://www.youtube.com/watch?v=oWDiptky4EI',
            // description: 'How AI is shaping the future of work and play.',
        },

    ];

    const openVideo = (videoUrl) => {
        const id = getYouTubeId(videoUrl);
        if (id) setActiveVideo(id);
    };
    const closeVideo = () => setActiveVideo(null);

    return (
        <div className="relative py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-950 overflow-hidden">
            {/* Background Blurs */}
            <div className="absolute top-16 left-12 w-32 h-32 rounded-full bg-purple-400/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-16 right-12 w-40 h-40 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none"></div>

            <div className="max-w-full mx-auto relative z-10">
                <motion.h2
                    className="text-xl md:text-5xl font-semibold text-center bg-clip-text text-[#00baff] bg-gradient-to-r from-purple-600 to-indigo-500 mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    🎙️Learn Smarter Our Podcasts
                </motion.h2>

                <motion.p
                    className="text-sm md:text-lg text-center bg-clip-text text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:bg-[#00091a] mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    Quick tips and stories to boost your course automation skills.
                </motion.p>

                {/* Swiper Slider */}
                <div className="relative">
                    {/* Left Button */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute top-1/2 left-2 -translate-y-1/2 z-20 p-3 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition"
                    >
                        <FaArrowLeft />
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute top-1/2 right-2 -translate-y-1/2 z-20 p-3 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition"
                    >
                        <FaArrowRight />
                    </button>

                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
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
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="podcast-swiper pb-16"
                    >
                        {podcasts.map(({ id, title, host, videoUrl }) => {
                            const videoId = getYouTubeId(videoUrl);
                            if (!videoId) return null;
                            return (
                                <SwiperSlide key={id}>
                                    <motion.div
                                        className="bg-white mt-10  dark:bg-[#00091a] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer flex flex-col h-full"
                                        whileHover={{ y: -8, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => openVideo(videoUrl)}
                                    >
                                        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                            <img
                                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                                alt={`${title} podcast thumbnail`}
                                                className="w-full h-full object-cover filter brightness-90 transition-transform duration-300 hover:scale-105"
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

                                        <div className="p-5 flex space-y-4 flex-col flex-grow">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
                                            <p className="text-purple-600 text-xs dark:text-purple-400 font-medium">{host}</p>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div
                    onClick={closeVideo}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                >
                    <button
                        onClick={closeVideo}
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
