import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRedo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../SocialLogin/SocialLogin";
import AuthContext from "../../../Content/Authcontext";
import Lottie from "lottie-react";
import LoginLottieData from '../../../../public/lottie/login/login blue.json';
import Swal from "sweetalert2";

const generateCaptcha = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const CaptchaSVG = ({ captcha, width = 150, height = 50 }) => {
  const chars = captcha.split("");
  const charSpacing = width / (chars.length + 1);
  const randomLines = Array.from({ length: 6 }, () => ({
    x1: Math.random() * width,
    y1: Math.random() * height,
    x2: Math.random() * width,
    y2: Math.random() * height,
    strokeWidth: 1 + Math.random() * 1.5,
  }));

  return (
    <svg
      width={width}
      height={height}
      style={{ userSelect: "none", background: "white", borderRadius: 10 }}
    >
      {chars.map((char, idx) => {
        const x = charSpacing * (idx + 1);
        const y = height / 2 + (Math.random() - 0.5) * 10;
        const rotate = (Math.random() - 0.5) * 30;
        const fontSize = 28 + Math.random() * 8;
        return (
          <text
            key={idx}
            x={x}
            y={y}
            fontSize={fontSize}
            fontWeight="bold"
            fill="#6b21a8"
            style={{
              transformOrigin: `${x}px ${y}px`,
              transform: `rotate(${rotate}deg)`,
              fontFamily: "monospace",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {char}
          </text>
        );
      })}
      {randomLines.map((line, idx) => (
        <line
          key={idx}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#8b5cf6"
          strokeWidth={line.strokeWidth}
          strokeLinecap="round"
          opacity={0.6}
        />
      ))}
    </svg>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [disable, setDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { singInUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (userCaptchaInput.length === 6) {
      if (userCaptchaInput === captcha) {
        setDisable(false);
        setCaptchaError("");
      } else {
        setDisable(true);
        setCaptchaError("Captcha did not match!");
      }
    } else {
      setDisable(true);
      setCaptchaError("");
    }
  }, [userCaptchaInput, captcha]);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptchaInput("");
    setCaptchaError("");
    setDisable(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields!");
      return;
    }

    setIsLoading(true);

    singInUser(email, password)
      .then(() => {
        Swal.fire({
          title: '✅ Login Successful!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // stylish gradient bg
          color: '#fff', // text color
          padding: '1.5rem',
          iconColor: '#00baff', // icon color
          toast: true,
          position: 'top-end'


        }).then(() => {
          // Swal close hole navigate hobe
          navigate("/"); // home page e redirect
        });
      })
      .catch((err) => {
        console.log("error login ", err);
        Swal.fire({
          title: '❌ Email or Password is incorrect!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
          background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // stylish gradient bg
          color: '#fff', // text color
          padding: '1.5rem',
          iconColor: '#00baff', // icon color
          toast: true,
          position: 'top-end'


        })
      })
      .finally(() => setIsLoading(false));
  };



  return (
    <div className="dark:bg-[#00091a] min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto max-sm:w-full bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Lottie Animation */}
        <div className="flex items-center justify-center p-5 md:p-10 bg-gray-100 dark:bg-[#0a1a33]">
          <Lottie
            animationData={LoginLottieData}
            loop={true}
            className="w-full max-w-full"
          />
        </div>

        {/* Form */}
        <div className="p-5 md:p-4">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-[#00baff]">
            Login
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            #Login to continue your learning journey
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-5 py-4 pr-14 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Captcha */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Security Verification
              </label>
              <div className="flex items-center justify-between bg-gray-100 dark:bg-[#1a243a] p-4 rounded-xl select-none">
                <CaptchaSVG captcha={captcha} />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 ml-4"
                  aria-label="Refresh Captcha"
                >
                  <FaRedo size={24} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter captcha text"
                maxLength={6}
                value={userCaptchaInput}
                onChange={(e) => setUserCaptchaInput(e.target.value.trim())}
                className="w-full px-5 py-4 mt-3 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {captchaError && (
                <p className="text-red-500 mt-2 text-sm animate-pulse flex items-center gap-1">
                  {captchaError}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={disable || isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white transition duration-300 flex items-center justify-center ${disable || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Login
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div> */}

          {/* <SocialLogin /> */}

          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default Login;
