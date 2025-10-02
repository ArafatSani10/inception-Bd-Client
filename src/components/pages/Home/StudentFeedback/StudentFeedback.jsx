import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
    {
        name: '@iTcarePath',
        text: 'Excellent tutorial,the method of your teaching is very effective and useful for learners,Mashaallah.Thank You for your greate efforts for us.I want to continue all your courses including python basics to advance and advance in machine learning.My plan to become an ai engineer.You can suggest me if you have any suggestions if im on right truck or not?',
        avatar: 'https://i.ibb.co.com/nqJN5nSQ/r1-1.jpg',
        role: 'From YouTube'
    },

    {
        name: '@ayshataiba5624',
        text: 'অসাধারন। এতো ডিটেইলস, কোয়ালিটিফুল কমপ্লিট টিউটোরিয়াল আর কথাও নেই। অনেক ধন্যবাদ।',
        avatar: 'https://i.ibb.co.com/93ChBtzy/360-F-1408824601-Y1f5y-VDcoq-Y1n-N52z-LI2-Pfk-XUu-Nbf-XSA.jpg',
        role: 'From YouTube'
    },



    {
        name: '@alliswell9994',
        text: 'Chat gpt এ কাছে পাইথন শিখার রোডম্যাপ চেয়েছিলাম, এবং শিখার জন্য ভিডিও লিংক চেয়েছিলাম, আমাকে আপনার ভিডিও লিংক সাজেস্ট করলো যেন বেসিক থেকে শুরু করি।ক্লাস করা শুরু করলাম,আশা রাখি ভালো কিছুই শিখতে পারবো ইনশাআল্লাহ্‌।',
        avatar: 'https://i.ibb.co.com/PGLxXrBc/r3-1.jpg',
        role: 'From YouTube'
    },


    {
        name: 'PIAL PAUL',
        text: 'I don’t know how I can explain, this is one of the best courses & especially in Bangla. So everyone can relate and understand everything from the core. Thanks Bappy Bhai/Sir for conducting and arranging this kind of course.',
        avatar: 'https://ui-avatars.com/api/?name=PP&background=4F46E5&color=ffffff&size=128',
        role: 'From Course'
    },


    {
        name: '@shortWM',
        text: 'আপনি বাংলাদেশর এমএল কমিউনিটিতে অনেক বড় কন্ট্রিবিউট রাখছেন। আমাদের জন্য এটা অনুপ্রেরনা। ধন্যবাদ ভাই আপনাকে অনেক। ',
        avatar: 'https://i.ibb.co.com/H8z0QC7/r6-1.jpg',
        role: 'From YouTube'
    },

    {
        name: 'Md. Saad',
        text: 'কয়েকদিন হলো আপনাদেরকে পেলাম। ৫ টি ক্লাস শেষ করেছি আলহামদুলিল্লাহ। সবগুলা ক্লাস করব ইনশাআল্লাহ। আপনারা জাতির কল্যাণের জন্য যে উদ্যোগ নিয়েছেন তাতে আপনাদের সফলতা কামনা করছি। আল্লাহ আপনাদেরকে উত্তম প্রতিদান দান করুক।',
        avatar: 'https://ui-avatars.com/api/?name=MS&background=4F46E5&color=ffffff&size=128',
        role: 'From Course'
    },


    // from courses

    {
        name: '@allaboutsemicolons',
        text: 'Huge thanks to the team for providing this amazing GenAI course for free! Really appreciate the opportunity to learn such valuable skills.Starting from today - excited for the journey ahead!',
        avatar: 'https://i.ibb.co.com/Mk0kxTqZ/r4-1.jpg',
        role: 'From YouTube'
    },
    {
        name: 'Rasel Sarker',
        text: 'Alhamdulillah! such courses in Bangali are still very rare in our country. Bangladesh I am very happy to be a member of this platform. Thanks to Inception BD and especially thanks to Bappy Bhaiya for taking this wonderful initiative.',
        avatar: 'https://ui-avatars.com/api/?name=RS&background=4F46E5&color=ffffff&size=128',
        role: 'From Course'
    },


    

    {
        name: '@saymaislam3242',
        text: 'Chat gpt k foundamental course caisilam apner link dlo cls kore Alhamdulillah onk benefit peyesi via apni onk valo vabe bujate paren',
        avatar: 'https://i.ibb.co.com/2Y7WZNDt/r2-1.jpg',
        role: 'From YouTube'
    },
    {
        name: 'Tanjin Adnan Abir',
        text: 'This is an awesome course on LLM that I found in Bangla. I appreciate the Inception team’s dedication for making the course.',
        avatar: 'https://ui-avatars.com/api/?name=TA&background=d1d5db&color=ffffff&size=128',
        role: 'From Course'
    }



];

// **********************************************
// **** TestimonialCard কম্পোনেন্ট (অপরিবর্তিত) ****
// **********************************************
const TestimonialCard = ({ item }) => (
    <motion.div
        // w-96 বা w-80 ব্যবহার করে নির্দিষ্ট প্রস্থ সেট করা হয়েছে
        className="shadow-xl rounded-3xl p-8 w-96 flex-shrink-0 relative border border-gray-100 dark:border-gray-700"
        whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)' }}
        transition={{ duration: 0.3 }}
    >
        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-teal-400/5 dark:bg-teal-400/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-400/5 dark:bg-teal-400/10 rounded-full" />
        <FaQuoteRight className="text-teal-400 text-3xl absolute top-8 right-8 opacity-10" />

        {/* User Info */}
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
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">{item.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.role}</p>
            </div>
        </div>

        {/* রিভিউ টেক্সট - স্বাভাবিক Word Wrap হবে */}
        <p className="text-gray-700 dark:text-gray-300 **text-sm** mb-5 leading-relaxed relative z-10">
            "{item.text}"
        </p>

        {/* Rating Stars */}
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

// **********************************************
// **** StudentFeedback কম্পোনেন্ট (Whitespace-nowrap Removed) ****
// **********************************************
const StudentFeedback = () => {
    const topRef = useRef(null);
    const bottomRef = useRef(null);
    const [topWidth, setTopWidth] = useState(0);
    const [bottomWidth, setBottomWidth] = useState(0);

    useEffect(() => {
        // স্ক্রল উইডথ গণনা
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
                        Real voices. Real experiences. Discover how our courses have empowered learners to grow their skills  their goals.
                    </motion.p>
                </div>

                {/* Top Row - Scroll Left */}
                <motion.div
                    className="overflow-hidden relative mb-12 py-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        ref={topRef}
                        // *****************************************
                        // **পরিবর্তন:** whitespace-nowrap ক্লাসটি সরানো হয়েছে
                        className="flex gap-8 items-start"
                        // *****************************************
                        animate={{ x: [0, -topWidth] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
                    >
                        {[...testimonials, ...testimonials].map((item, i) => (
                            <TestimonialCard key={`top-${i}`} item={item} />
                        ))}
                    </motion.div>
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-20" />
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
                        // *****************************************
                        // **পরিবর্তন:** whitespace-nowrap ক্লাসটি সরানো হয়েছে
                        className="flex gap-8 w-max items-start"
                        // *****************************************
                        animate={{ x: [-bottomWidth, 0] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
                    >
                        {[...testimonials, ...testimonials].map((item, i) => (
                            <TestimonialCard key={`bottom-${i}`} item={item} />
                        ))}
                    </motion.div>
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-20" />
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