import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import logo from '../assets/logo-removebg.png';
import { BiMenu, BiX } from 'react-icons/bi';

const Navbar = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('userData');
        navigate('/');
        setIsMenuOpen(false);
    };

    const handleLogoClick = () => {
        if (userData) {
            navigate('/dash');
        } else {
            navigate('/');
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div onClick={handleLogoClick} className="flex-shrink-0 flex items-center cursor-pointer">
                            <img className="h-12 w-auto" src={logo} alt="Logo" />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        {userData ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="flex items-center space-x-2">
                                    <img
                                        className="h-8 w-8 rounded-full border-2 border-gray-200"
                                        src={userData.picture}
                                        alt="Profile"
                                    />
                                    <span className="font-medium text-gray-700">
                                        {userData.name}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/about"
                                    className="text-black px-6 py-2 rounded-md text-sm font-medium hover:text-gray-600"
                                >
                                    About
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-black px-6 py-2 rounded-md text-sm font-medium hover:text-gray-600"
                                >
                                    Contact
                                </Link>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-[#349D69] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#175773] transition-colors"
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                    {userData ? (
                        <>
                            <div className="flex items-center space-x-2 px-3 py-2">
                                <img
                                    className="h-8 w-8 rounded-full border-2 border-gray-200"
                                    src={userData.picture}
                                    alt="Profile"
                                />
                                <span className="font-medium text-gray-700">
                                    {userData.name}
                                </span>
                            </div>
                            <Link
                                to="/profile"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/about"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/signup"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;