import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../Utils/frebase'; // Corrected the path
import AuthButton from '../../Components/AuthButton'; // Ensure the path is correct

function LoginUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="w-96 rounded-2xl shadow-lg bg-gray-800">
                <div className="text-center text-4xl font-semibold py-8 bg-gradient-to-r from-purple-600 to-blue-600 text-gray-200 rounded-t-2xl">
                    Login Up
                </div>
                <form className="px-8 py-8" onSubmit={handleSignUp}>
                    <div className="relative mb-6">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            className="w-full h-12 px-4 rounded-full bg-gray-700 border border-gray-500 text-gray-200 focus:border-blue-500 focus:outline-none peer text-lg"
                            onFocus={() => setEmailFocused(true)}
                            onBlur={(e) => setEmailFocused(e.target.value !== "")}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-4 top-2 text-gray-400 transition-all duration-300 ease-in-out ${
                                emailFocused || email ? 'transform -translate-y-6 text-blue-500 text-sm bg-gray-800 px-1' : ''
                            }`}
                        >
                            Email Address
                        </label>
                    </div>
                    <div className="relative mb-6">
                        <input
                            value={password}
                            type="password"
                            id="password"
                            required
                            className="w-full h-12 px-4 rounded-full bg-gray-700 border border-gray-500 text-gray-200 focus:border-blue-500 focus:outline-none peer text-lg"
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={(e) => setPasswordFocused(e.target.value !== "")}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-4 top-2 text-gray-400 transition-all duration-300 ease-in-out ${
                                passwordFocused || password ? 'transform -translate-y-6 text-blue-500 text-sm bg-gray-800 px-1' : ''
                            }`}
                        >
                            Password
                        </label>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mb-4">
                            {error}
                        </div>
                    )}
                    <div>
                        <AuthButton text={"Login"} onClick={handleSignUp} isLoading={loading} />
                    </div>
                    <div className="text-center mt-6 text-lg">
                        Don't have an account?{' '}
                        <Link to="/SignUp" className="text-blue-500 hover:underline">
                            SignUp
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginUp;
