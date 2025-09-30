import React, { useState } from "react";
import Lottie from "lottie-react";
import OTPLottie from "../../../../public/lottie/opt/Otp verification.json"; // আপনার Lottie path adjust করুন
import axios from "axios";

import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isForgotPassword, email } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // alert("verify hit")
    console.log("otp", otp);
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        { otp }
      );

      if (response.status === 200 && isForgotPassword) {
        navigate("/reset-password", { state: { email } });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("otp verify error", error);
      setError(error?.response?.data?.message || "Something went wrong");
      toast.error(error?.message || "something went wrong..");
      setIsSubmitting(false);
    }
  };

  // const handleResend = () => {
  //   alert("OTP resent! (frontend simulation)");
  // };

  return (
    <div className="mt-10 py-10 flex flex-col lg:flex-row items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center p-10">
        <Lottie
          animationData={OTPLottie}
          loop={true}
          className="w-full max-w-sm"
        />
      </div>

      {/* OTP Form */}
      <div className="w-full lg:w-1/2 max-w-md bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl space-y-6 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center text-[#00baff] mb-2">
          OTP Verification
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Enter the 6-digit OTP sent to your registered number/email
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full p-4 text-center text-2xl tracking-widest rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-500"
            required
          />

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-0.5 transition disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-500 dark:text-gray-400 mr-2">
            Didn't receive OTP?
          </span>
          <button
            // onClick={handleResend}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
