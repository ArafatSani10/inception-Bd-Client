import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../Content/Authcontext';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (res) => {
                const user = res.user;
                console.log("Firebase User:", user);

                // Ask user for phone number
                let phone = prompt("Please enter your phone number:");
                if (!phone) phone = "unknown"; // fallback

                const userData = {
                    name: user.displayName || 'User',
                    email: user.email,
                    password: Math.random().toString(36).slice(-8),
                    phone: phone,
                    role: 'student',
                    status: 'active',
                    isVerified: true,
                };

                try {
                    setLoading(true);
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_URL}/auth/signup`,
                        userData
                    );


                    if (response.data.success) {
                        toast.success(`🎉 Welcome, ${userData.name}! Registration successful.`, {
                            position: "top-right",
                            autoClose: 3000,
                            theme: "colored",
                        });
                        navigate('/'); // redirect
                    } else {
                        toast.error('Failed to register user');
                    }
                } catch (err) {
                    console.error(err.response?.data || err.message);
                    toast.error('Error connecting to server');
                } finally {
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Google sign-in failed');
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                type="button"
                disabled={loading}
                className={`
                    w-full flex items-center justify-center gap-4
                    py-3.5 rounded-xl
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-[#111827]
                    text-gray-800 dark:text-gray-200
                    font-semibold
                    shadow-sm
                    hover:shadow-md
                    transition
                    duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    active:scale-95
                    select-none
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                aria-label="Sign in with Google"
            >
                <img
                    className="w-8 h-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                />
                <span>{loading ? "Processing..." : "Sign in with Google"}</span>
            </button>
        </div>
    );
};

export default SocialLogin;
