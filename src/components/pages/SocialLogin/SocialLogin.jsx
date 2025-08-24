import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../Content/Authcontext';
import { useNavigate } from 'react-router';


const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (res) => {
                const user = res.user;
                console.log("Firebase User:", user);

            
                    toast.success(`🎉 Welcome, ${user.displayName || "User"}! Registration successful.`, {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                    });

                    navigate('/'); // Redirect homepage
    
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="
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
                "
                aria-label="Sign in with Google"
            >
                <img
                    className="w-8 h-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                />
                <span>Sign in with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
