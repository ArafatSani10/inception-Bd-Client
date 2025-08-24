import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="py-16 md:py-24 p-5  max-w-full mx-auto">
      <div className="w-full max-w-full  mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block bg-[#b4bdef] dark:bg-[#00baff] px-4 py-2 rounded-full">
              <span className="text-blue text-white dark:text-white font-medium">
                Unlock Your Potential
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Master <span className="text-[#00baff]">In-Demand Skills</span> with Expert-Led Courses
            </h1>

            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Join thousands of students mastering new skills with our interactive courses. Learn from industry experts at your own pace, anytime, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to='/courses'> <button className="px-8 py-4 bg-[#00baff] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105">
                Explore Courses
              </button></Link>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-medium rounded-lg shadow hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Demo
                </div>
              </button>
            </div>

            <div className="pt-10 pb-10 flex items-center gap-4 ">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-indigo-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-red-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-medium text-[#00baff]">5k+</div>
              </div>
              <div className='my-5'>
                <p className="font-medium text-gray-900 dark:text-white">Join our community</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">of successful learners</p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:w-1/2 relative">
            <div className="relative max-w-2xl mx-auto w-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl text-gray-900 dark:text-white font-semibold">Python Live for Beginners in Bangla</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">(5/5)</span>
                    </div>
                  </div>
                  <div className="bg-indigo-500  dark:bg-[#00baff] text-white dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                    Bestseller
                  </div>
                </div>

                <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <img
                    src="https://inceptionbd.com/store/1/Course/Python%20Free%20Course.png"
                    alt="Course Thumbnail"
                    className="w-full h-full object-fill"
                  // aikhane course er image dynamic hobe back-end theke data asbe name image and instructor name chnage hobe
                  />
                </div>


                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-700">RH</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Md.Ridoy Hossain</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Robotics</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$89.99</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">$129.99</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#00baff] rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00baff] rounded-full"></div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-[#00baff] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
