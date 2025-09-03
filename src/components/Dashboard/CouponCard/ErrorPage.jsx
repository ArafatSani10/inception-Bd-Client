import React, { useEffect } from "react";
import { FaTimesCircle, FaRedo, FaHome, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const ErrorPage = () => {
  const navigate = useNavigate();


  return (
    <div className="relative py-10 mt-10 flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden px-4">

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-300/30 dark:bg-red-500/20 rounded-full animate-float"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Glassmorphic Card */}
      <div className="relative backdrop-blur-lg bg-white/20 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/40 rounded-3xl shadow-2xl p-10 max-w-5xl w-full text-center transition-all duration-500">
        
        {/* Animated Payment Failed Icon */}
        <div className="flex justify-center mb-6">
          <FaTimesCircle className="text-red-500 w-28 h-28 transform scale-0 animate-error hover:animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500 mb-4 animate-text">
          Payment Failed
        </h1>

        {/* Subtitle / Explanation */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
          Unfortunately, your payment could not be processed. This might be due to network issues or insufficient balance.
        </p>

        {/* Suggestions */}
        <ul className="text-gray-700 dark:text-gray-300 mb-8 space-y-2 text-left max-w-md  mx-auto">
          <li>• Check your card or payment method.</li>
          <li>• Ensure you have sufficient funds.</li>
          <li>• Try again or contact support if the issue persists.</li>
        </ul>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/retry-payment")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            <FaRedo /> Retry Payment
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            <FaHome /> Go Home
          </button>

         
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes error {
            0% { transform: scale(0) rotate(-20deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); }
          }
          .animate-error {
            animation: error 0.8s ease-out forwards;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .animate-pulse {
            animation: pulse 1.2s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.7; }
            50% { transform: translateY(-30px); opacity: 0.4; }
            100% { transform: translateY(0px); opacity: 0.7; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes text {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-text {
            animation: text 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ErrorPage;
