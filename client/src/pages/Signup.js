import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../style.css';

const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/users/', formData);
            return response.data;
        } catch (err) {
            let errorMessage = 'Something went wrong';
            if (err.response?.data) {
                // Convert different error formats to string
                if (typeof err.response.data === 'object') {
                    if (err.response.data.detail) {
                        errorMessage = err.response.data.detail;
                    } else {
                        // Handle nested error objects
                        errorMessage = Object.entries(err.response.data)
                            .map(([key, value]) => {
                                if (Array.isArray(value)) {
                                    return `${key}: ${value.join(', ')}`;
                                }
                                return `${key}: ${value}`;
                            })
                            .join('; ');
                    }
                } else {
                    errorMessage = String(err.response.data);
                }
            }
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};

const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);

            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/auth/token',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data && response.data.access_token) {
                return response.data;
            }
            throw new Error('Invalid response from server');
        } catch (err) {
            let errorMessage = 'Invalid credentials';
            if (err.response?.data) {
                if (typeof err.response.data === 'object' && err.response.data.detail) {
                    errorMessage = err.response.data.detail;
                } else {
                    errorMessage = String(err.response.data);
                }
            }
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};

const Signup = () => {
    const [show, setShow] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const navigate = useNavigate();
    const { signup, isLoading, error } = useSignup();
    const { login: loginApi, isLoading: isLoginLoading, error: loginError } = useLogin();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        institute: '',
        phone_number: '',
    });

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            if (response) {
                navigate('/');
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginApi(loginData);
            if (response && response.access_token) {
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('userData', JSON.stringify({ username: loginData.username }));
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const toggleCard = () => setIsSignup((prev) => !prev);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                    }
                );
                localStorage.setItem('userData', JSON.stringify(userInfo.data));
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className="bg-gray-900 min-h-screen py-8 flex justify-center items-start">
            <div className="w-[400px] perspective">
                <div className={`flip-card ${isSignup ? 'flipped' : ''}`}>
                    {/* Signup Card */}
                    <div className="flip-card-front bg-white rounded-xl p-8 flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl">Create an account</h1>
                        </div>
                        {error && <div className="text-red-500 text-center">{error}</div>}
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSignup}>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">First Name</p>
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleInputChange}
                                    value={formData.first_name}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Last Name</p>
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleInputChange}
                                    value={formData.last_name}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Username</p>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleInputChange}
                                    value={formData.username}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Password</p>
                                <div className="relative">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="border-2 w-full p-3 rounded-md border-black border-solid"
                                        onChange={handleInputChange}
                                        value={formData.password}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Institute</p>
                                <input
                                    type="text"
                                    name="institute"
                                    placeholder="Institute"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleInputChange}
                                    value={formData.institute}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Phone Number</p>
                                <input
                                    type="text"
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleInputChange}
                                    value={formData.phone_number}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#34A069] font-bold text-xl text-white py-3 rounded-full mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="w-full flex items-center gap-3">
                            <div className="h-[1px] flex-1 bg-gray-300"></div>
                            <p className="text-gray-500">OR</p>
                            <div className="h-[1px] flex-1 bg-gray-300"></div>
                        </div>

                        <button
                            onClick={() => login()}
                            className="flex items-center justify-center gap-2 border-2 border-gray-300 rounded-full py-2 hover:bg-gray-50 transition-colors"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="w-6"
                            />
                            <span>Continue with Google</span>
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">Already have an account?</p>
                            <button className="text-green-500 font-semibold" onClick={toggleCard}>
                                Sign In
                            </button>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="flip-card-back bg-white rounded-xl p-8 flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className="font-bold text-4xl">Sign in</h1>
                            <p className="text-gray-600">to MasterMind account</p>
                        </div>

                        {loginError && <div className="text-red-500 text-center">{loginError}</div>}
                        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Username</p>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="border-2 p-3 rounded-md border-black border-solid"
                                    onChange={handleLoginInputChange}
                                    value={loginData.username}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-mono text-xl">Password</p>
                                <div className="relative">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="border-2 w-full p-3 rounded-md border-black border-solid"
                                        onChange={handleLoginInputChange}
                                        value={loginData.password}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#34A069] font-bold text-xl text-white py-3 rounded-full mt-4"
                                disabled={isLoginLoading}
                            >
                                {isLoginLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="w-full flex items-center gap-3">
                            <div className="h-[1px] flex-1 bg-gray-300"></div>
                            <p className="text-gray-500">OR</p>
                            <div className="h-[1px] flex-1 bg-gray-300"></div>
                        </div>

                        <button
                            onClick={() => login()}
                            className="flex items-center justify-center gap-2 border-2 border-gray-300 rounded-full py-2 hover:bg-gray-50 transition-colors"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="w-6"
                            />
                            <span>Continue with Google</span>
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">Don't have an account?</p>
                            <button className="text-green-500 font-semibold" onClick={toggleCard}>
                                Sign Up
                            </button>
                            <button className="text-green-500 block mx-auto mt-2">
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;