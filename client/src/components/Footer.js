import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#14576E] text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Logo and Contact */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">MasterMind</h1>
                    <p className="text-gray-300">support@mastermind.com</p>
                    <div className="flex space-x-4 text-sm">
                        <Link to="/dash" className="hover:underline">
                            Dashboard
                        </Link>
                        <Link to="/signup" className="hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Study Tools */}
                <div className="space-y-2">
                    <h2 className="font-bold">Study Tools</h2>
                    <ul className="space-y-1 text-gray-300">
                        <li>
                            <Link to="/dash" className="hover:text-white">
                                Flash Cards
                            </Link>
                        </li>
                        <li>
                            <Link to="/dash" className="hover:text-white">
                                Practice Tests
                            </Link>
                        </li>
                        <li>
                            <Link to="/dash" className="hover:text-white">
                                Study Guides
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div className="space-y-2">
                    <h2 className="font-bold">Company</h2>
                    <ul className="space-y-1 text-gray-300">
                        <li>
                            <Link to="/about" className="hover:text-white">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="hover:text-white">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div className="space-y-2">
                    <h2 className="font-bold">Resources</h2>
                    <ul className="space-y-1 text-gray-300">
                        <li>
                            <Link to="/multiple" className="hover:text-white">
                                Multiple Choice
                            </Link>
                        </li>
                        <li>
                            <Link to="/learning-options" className="hover:text-white">
                                Learning Options
                            </Link>
                        </li>
                        <li>
                            <Link to="/selection" className="hover:text-white">
                                Subject Selection
                            </Link>
                        </li>
                    </ul>
                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-white text-gray-300">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="hover:text-white text-gray-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="hover:text-white text-gray-300">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#" className="hover:text-white text-gray-300">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
