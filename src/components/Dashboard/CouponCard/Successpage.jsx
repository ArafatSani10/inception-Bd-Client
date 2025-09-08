import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  const navigate = useNavigate();

  // Trigger confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#8b5cf6", "#ec4899", "#22d3ee", "#facc15"],
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4">
      <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/40 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center transition-all duration-500">
        
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-400 w-24 h-24 transform scale-0 animate-success" />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          🎉 Success!
        </h1>

        {/* Message */}
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Your cupon has been created and enrolled successfully. 
          You can now start learning or share it with your students!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/student-dashboard/user-home")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          Go to Courses
        </button>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes success {
            0% { transform: scale(0); }
            60% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .animate-success {
            animation: success 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default SuccessPage;
