import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/pages/shared/Navbar/Navbar';
import { FaArrowUp } from 'react-icons/fa';
import Footer from '../components/pages/shared/Footer/Footer';

const Mainlayout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-montserrat relative  bg-white text-gray-900 dark:bg-[#0e0f11] dark:text-white transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer></Footer>

      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl group transition-all duration-300 overflow-hidden border dark:border-white/20 border-black/10 bg-white/70 dark:bg-white/5 backdrop-blur-md hover:scale-110"
        >
          {/* Glowing halo background */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-500 opacity-20 blur-xl group-hover:opacity-40 dark:from-blue-500 dark:to-indigo-500"></div>
          
          <FaArrowUp
            size={18}
            className="relative z-10 text-gray-900 dark:text-white"
          />
        </button>
      )}
    </div>
  );
};

export default Mainlayout;
