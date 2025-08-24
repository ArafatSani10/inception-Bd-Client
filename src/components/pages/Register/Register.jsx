import React, { useContext, useEffect, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaRedo } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from '../SocialLogin/SocialLogin';
import AuthContext from '../../../Content/Authcontext';
import axios from 'axios';

// Generate random 6-digit captcha
const generateCaptcha = () => Math.floor(100000 + Math.random() * 900000).toString();

// Captcha SVG Component
const CaptchaSVG = ({ captcha, width = 150, height = 50 }) => {
    const chars = captcha.split('');
    const charSpacing = width / (chars.length + 1);
    const randomLines = Array.from({ length: 6 }, () => ({
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
        strokeWidth: 1 + Math.random() * 1.5,
    }));

    return (
        <svg width={width} height={height} style={{ userSelect: 'none', background: 'white', borderRadius: 10 }}>
            {chars.map((char, idx) => {
                const x = charSpacing * (idx + 1);
                const y = height / 2 + (Math.random() - 0.5) * 10;
                const rotate = (Math.random() - 0.5) * 30;
                const fontSize = 28 + Math.random() * 8;
                return (
                    <text key={idx} x={x} y={y} fontSize={fontSize} fontWeight="bold" fill="#6b21a8"
                        style={{ transformOrigin: `${x}px ${y}px`, transform: `rotate(${rotate}deg)`, fontFamily: 'monospace', userSelect: 'none', pointerEvents: 'none' }}>
                        {char}
                    </text>
                );
            })}
            {randomLines.map((line, idx) => (
                <line key={idx} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#8b5cf6" strokeWidth={line.strokeWidth} strokeLinecap="round" opacity={0.6} />
            ))}
        </svg>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const { createUser } = useContext(AuthContext);

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userCaptchaInput, setUserCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [disable, setDisable] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [touched, setTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Full password regex validation
    const conditions = [
        { regex: /.{6,}/, label: "At least 6 characters" },
        { regex: /[A-Z]/, label: "At least one uppercase letter" },
        { regex: /[a-z]/, label: "At least one lowercase letter" },
        { regex: /\d/, label: "At least one number" },
        { regex: /[!@#$%^&*]/, label: "At least one special character (!@#$%^&*)" },
    ];

    const isPasswordValid = conditions.every(cond => cond.regex.test(password));
    const isConfirmMatch = password === confirm && confirm.length > 0;

    useEffect(() => {
        if (userCaptchaInput.length === 6) {
            if (userCaptchaInput === captcha) {
                setCaptchaError('');
                setDisable(false);
            } else {
                setCaptchaError('Captcha did not match!');
                setDisable(true);
            }
        } else {
            setCaptchaError('');
            setDisable(true);
        }
    }, [userCaptchaInput, captcha]);

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setUserCaptchaInput('');
        setCaptchaError('');
        setDisable(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) { toast.error("Password does not meet requirements!"); return; }
        if (!isConfirmMatch) { toast.error("Passwords do not match!"); return; }
        if (disable) { toast.error("Captcha not valid!"); return; }

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const passwordValue = form.password.value;

        setIsLoading(true);

        try {
            // 🔹 Firebase Auth
            const result = await createUser(email, passwordValue);

            // ✅ Show toast instead of console.log
            toast.success(`🎉 Registration Successful! Welcome ${result.user}`, {
                position: "top-right",
                autoClose: 3000
            });

            // 🔹 Backend DB save
            await axios.post('http://localhost:5000/api/v1/auth/signup', {
                name,
                email,
                phone,
                password: passwordValue
            });

            navigate('/login');
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error(`❌ Registration failed: ${err.response?.data?.message || err.message}`, {
                position: "top-right",
                autoClose: 4000
            });
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dark:bg-[#00091a] min-h-screen flex items-center justify-center py-20">
            <div className="max-w-7xl mx-auto bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <div className="lg:flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] to-[#ede7f6] dark:from-[#0f172a] dark:to-[#1e2a3a]">
                    <img src="https://inceptionbd.com/store/1/default_images/front_register.jpg" alt="Register Illustration" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-5">
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-[#00baff]">Register</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">#Register to continue your learning journey</p>
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Full Name</label>
                            <input type="text" name="name" placeholder="Enter your Name" required className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email Address</label>
                            <input type="email" name="email" placeholder="you@example.com" required className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Phone Number</label>
                            <input type="number" name="phone" placeholder="Enter your Phone Number" required className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); if (!touched) setTouched(true); }} placeholder="Enter your password" name="password" required className="w-full px-5 py-4 pr-14 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">{showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}</button>
                            </div>
                            {touched && (
                                <ul className="mt-2 mb-4 space-y-1 text-sm">
                                    {conditions.map((cond, idx) => {
                                        const valid = cond.regex.test(password);
                                        return (<li key={idx} className={`flex items-center gap-2 ${valid ? 'text-green-600' : 'text-red-500'}`}>{valid ? '✅' : '❌'} {cond.label}</li>);
                                    })}
                                </ul>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Confirm Password</label>
                            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password" required className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Security Verification</label>
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-[#1a243a] p-4 rounded-xl select-none">
                                <CaptchaSVG captcha={captcha} />
                                <button type="button" onClick={refreshCaptcha} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 ml-4"><FaRedo size={24} /></button>
                            </div>
                            <input type="text" placeholder="Enter Security Verification text" maxLength={6} value={userCaptchaInput} onChange={e => setUserCaptchaInput(e.target.value.trim())} className="w-full px-5 py-4 mt-3 rounded-xl bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            {captchaError && (<p className="text-red-500 mt-2 text-sm animate-pulse flex items-center gap-1">{captchaError}</p>)}
                        </div>
                        <button type="submit" disabled={disable || isLoading} className={`w-full py-4 rounded-xl font-bold text-white transition duration-300 flex items-center justify-center ${disable || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-xl transform hover:-translate-y-0.5'}`}>
                            {isLoading ? 'Processing...' : 'Register'}
                        </button>
                    </form>

                    <div className="my-8 flex items-center">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                        <span className="mx-4 text-gray-500 dark:text-gray-400">or continue with</span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                    </div>

                    <SocialLogin />
                    <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                        Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
                    </p>
                </div>
            </div>
            <ToastContainer position="top-right" theme="colored" />
        </div>
    );
};

export default Register;
