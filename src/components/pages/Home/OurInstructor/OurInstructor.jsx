import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router';

const instructors = [
    {
        id: 1,
        name: 'Md.Ridoy Hossain',
        role: 'Robotics Engineer, Programmer, Mentor & Entrepreneur ',
        image: 'https://inceptionbd.com/store/1/1686419740636.jpg',
        rating: 5,
        profileLink: '/instructorProfile',
    },
    {
        id: 2,
        name: 'Boktiar Ahmed Bappy',
        role: 'AI Engineer, YouTuber, Mentor & Entrepreneur',
        image: 'https://inceptionbd.com/store/1/IMG_8206.jpg',
        rating: 5,
        profileLink: '#',
    },
    {
        id: 3,
        name: 'Debasis Kumar Biswas ',
        role: 'Automation Engineer, Programmer & Mentor ',
        image: 'https://inceptionbd.com/store/1946/avatar/67925d2930c56.png',
        rating: 5,
        profileLink: '#',
    },
    {
        id: 4,
        name: 'Maruf Hossain',
        role: 'Software Engineer, Programmer & Mentor',
        image: 'https://randomuser.me/api/portraits/women/58.jpg',
        rating: 5,
        profileLink: '#',
    },
    
];

const OurInstructor = () => {
    return (
        <div className="py-16  max-w-full mx-auto text-center ">
            <h2 className="text-xl md:text-5xl text-center font-semibold text-[#00baff] dark:text-[#00baff] ">
                🧑‍🏫Instructors
            </h2>

            <p className='text-sm md:text-lg  mt-4 text-center  text-gray-900 dark:text-white mb-12'>
                #Learn from the experienced & skillful instructors
            </p>

            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-14"
            >
                {instructors.map((instructor) => (
                    <SwiperSlide key={instructor.id}>
                        <div className="bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-3xl p-5 hover:shadow-xl  ">
                            <img
                                src={instructor.image}
                                alt={instructor.name}
                                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                            />
                            <h3 className="mt-5 text-xl font-semibold text-[#00baff] dark:text-[#00baff]">{instructor.name}</h3>
                            <p className="text-[#00baff] dark:text-[#00baff] text-xs font-medium mt-2">{instructor.role}</p>

                            <div className="mt-3 text-yellow-400 text-lg">
                                {'⭐'.repeat(Math.floor(instructor.rating))}{' '}
                               
                            </div>

                            <Link
                                to='/instructorProfile'
                                className="inline-block mt-6 px-5 py-2 rounded-full bg-[#00baff] hover:from-purple-600 hover:to-indigo-600 text-white font-semibold shadow-md transition-all"
                            >
                                View Profile
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OurInstructor;
