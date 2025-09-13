import React from "react";
import { motion } from "framer-motion";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <motion.div
        className="w-16 h-16 border-4 border-t-[#00baff] border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingModal;
