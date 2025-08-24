import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
    {
        name: 'Mahim Muntasir',
        text: 'Best digital marketing course.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Marketing Specialist'
    },
    {
        name: 'Suria Akter Ratre',
        text: 'Teachers are professional.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'UI/UX Designer'
    },
    {
        name: 'Bilash Das',
        text: 'Career support helped me start freelancing immediately.',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'Frontend Developer'
    },
    {
        name: 'Nahid Hasan',
        text: 'Best trainer with industry experience and practical tips.',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
        role: 'Data Analyst'
    },
    {
        name: 'Eshita Khan',
        text: 'Great platform with comprehensive learning .',
        avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
        role: 'Content Creator'
    },
    {
        name: 'Tarek Islam',
        text: 'Helped me transition to freelancing in just 3 months.',
        avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
        role: 'Fullstack Developer'
    },
];

const TestimonialCard = ({ item }) => (
    <motion.div
        className=" shadow-xl rounded-3xl p-6 min-w-[320px] max-w-[420px]  flex-shrink-0 relative border border-gray-100 dark:border-gray-700 overflow-hidden"
        whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)' }}
        transition={{ duration: 0.3 }}
    >
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-teal-400/5 dark:bg-teal-400/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-400/5 dark:bg-teal-400/10 rounded-full" />

        <FaQuoteRight className="text-teal-400 text-3xl absolute top-6 right-6 opacity-10" />

        <div className="flex items-center mb-4 z-10 relative">
            <div className="relative">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <FaQuoteRight className="text-white text-xs" />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.role}</p>
            </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-xs mb-5 leading-relaxed relative z-10">
            "{item.text}"
        </p>

        <div className="flex text-amber-400 relative z-10">
            {[...Array(5)].map((_, j) => (
                <motion.div
                    key={j}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <FaStar size={14} />
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const StudentFeedback = () => {
    const topRef = useRef(null);
    const bottomRef = useRef(null);
    const [topWidth, setTopWidth] = useState(0);
    const [bottomWidth, setBottomWidth] = useState(0);

    useEffect(() => {
        if (topRef.current) setTopWidth(topRef.current.scrollWidth / 2);
        if (bottomRef.current) setBottomWidth(bottomRef.current.scrollWidth / 2);

        const handleResize = () => {
            if (topRef.current) setTopWidth(topRef.current.scrollWidth / 2);
            if (bottomRef.current) setBottomWidth(bottomRef.current.scrollWidth / 2);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative py-12 overflow-hidden px-4 bg-gradient-to-b from-teal-50/40 to-white dark:from-gray-950 dark:to-gray-950">
            <div className="max-w-full mx-auto">
                <div className="mb-16 text-center">
                    <motion.h2
                        className="text-xl md:text-5xl font-bold bg-clip-text text-[#00baff] bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                       👨‍🎓Our Students FeedBacks
                    </motion.h2>

                    <motion.p
                        className="mt-4 text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Real voices. Real experiences. Discover how our courses have empowered learners to grow their skills  their goals.
                    </motion.p>

                    {/* <div className="mt-8 flex justify-center">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-amber-400 mx-0.5" />
                            ))}
                            <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">4.9/5 from 200+ reviews</span>
                        </div>
                    </div> */}
                </div>

                {/* Top Row - Scroll Left */}
                <motion.div
                    className="overflow-hidden relative mb-12 py-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        ref={topRef}
                        className="flex gap-8  whitespace-nowrap"
                        animate={{ x: [0, -topWidth] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
                    >
                        {[...testimonials, ...testimonials].map((item, i) => (
                            <TestimonialCard key={`top-${i}`} item={item} />
                        ))}
                    </motion.div>

                    <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-20" />
                </motion.div>

                {/* Bottom Row - Scroll Right */}
                <motion.div
                    className="overflow-hidden relative py-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <motion.div
                        ref={bottomRef}
                        className="flex gap-8 w-max whitespace-nowrap"
                        animate={{ x: [-bottomWidth, 0] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
                    >
                        {[...testimonials, ...testimonials].map((item, i) => (
                            <TestimonialCard key={`bottom-${i}`} item={item} />
                        ))}
                    </motion.div>

                    <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-20" />
                </motion.div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-cyan-400/20 blur-xl"></div>
            <div className="absolute bottom-1/4 right-20 w-12 h-12 rounded-full bg-teal-400/20 blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-amber-400/20 blur-xl"></div>
        </div>
    );
};

export default StudentFeedback;