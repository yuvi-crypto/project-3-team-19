import React, { useState } from 'react';
import correct_symble from '../assets/correct_symble.webp';
import list from '../assets/list.webp';
import lamp from '../assets/lamp.webp';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            {/* Header Section */}
            <div className="background-color min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
                <div className="flex flex-col justify-center items-center p-4 md:p-8 w-full max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#175773] text-center mb-6">
                        Get in Touch With Us
                    </h1>
                    <p className='text-center text-lg md:text-xl mb-8'>
                        We're here to help and answer any questions you might have
                    </p>
                    
                    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-medium text-[#175773] mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-[#175773] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175773]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-[#175773] mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-[#175773] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175773]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-[#175773] mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-[#175773] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175773]"
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#349D69] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#175773] transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards Section */}
            <div className='bg-[#1757733d] py-8 px-4 md:p-10'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                    <div className='flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-white/50'>
                        <img src={correct_symble} alt="" className="w-12 h-12 md:w-16 md:h-16" />
                        <div>
                            <h3 className='font-bold mb-2'>Email Us</h3>
                            <p>support@example.com</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-white/50'>
                        <img src={list} alt="" className="w-12 h-12 md:w-16 md:h-16" />
                        <div>
                            <h3 className='font-bold mb-2'>Call Us</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-white/50'>
                        <img src={lamp} alt="" className="w-12 h-12 md:w-16 md:h-16" />
                        <div>
                            <h3 className='font-bold mb-2'>Visit Us</h3>
                            <p>123 Learning St, Education City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
