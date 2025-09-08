import React from "react";

const FounderStory = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 transition-colors duration-500">
      <h2 className="text-center text-4xl max-sm:text-2xl font-semibold text-gray-900 dark:text-white mb-12">
        How we can help you
      </h2>

      {/* First Section */}
      <div className="max-w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
        {/* Left Content */}
        <div>
          <p className="uppercase text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            Personal Branding Service
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Your Founder Story
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            A one-to-one branding program designed to elevate your confidence,
            articulate your core values, and pave the way for new opportunities
            through sharing your story.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Our streamlined approach requires only 1 day of commitment for the
            essentials; to clarify your unique positioning, crystallise your
            narrative, and craft your image.
          </p>

          <button className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white px-6 py-3 text-sm tracking-wider uppercase font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-orange-700 hover:to-yellow-600 transition-transform duration-300">
            Explore Branding Services
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://i.ibb.co/nsXsg1G5/inspiring-new-boss.jpg"
            alt="Founder"
            className="shadow-xl object-cover w-full max-h-[600px]  transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="max-w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="order-2 md:order-1">
          <p className="uppercase text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            Personal Branding Service
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Your Founder Story
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            A one-to-one branding program designed to elevate your confidence,
            articulate your core values, and pave the way for new opportunities
            through sharing your story.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Our streamlined approach requires only 1 day of commitment for the
            essentials; to clarify your unique positioning, crystallise your
            narrative, and craft your image.
          </p>

          <button className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white px-6 py-3 text-sm tracking-wider uppercase font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-orange-700 hover:to-yellow-600 transition-transform duration-300">
            Explore Branding Services
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-start order-1 md:order-2">
          <img
            src="https://i.ibb.co/nsXsg1G5/inspiring-new-boss.jpg"
            alt="Founder"
            className="shadow-xl object-cover w-full h-full  transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
