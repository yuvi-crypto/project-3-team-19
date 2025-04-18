import React, { useRef, useState } from 'react';
import correct_symble from '../assets/correct_symble.webp'
import list from '../assets/list.webp'
import lamp from '../assets/lamp.webp'
import blogimg from '../assets/blogimg.webp'
import bg from '../assets/homebg.png';

const Home = () => {

    const materials = [
        { icon: "📉", label: "lecture slide decks" },
        { icon: "🎥", label: "YouTube videos" },
        { icon: "📜", label: "PDFs" },
        { icon: "📖", label: "textbooks" },
        { icon: "🕸️", label: "webpages" },
        { icon: "📑", label: "study guides" },
        { icon: "🔌", label: "PowerPoint" },
        { icon: "🗒️", label: "notes" },
    ];

    const handleUpload = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log('Files selected:', files.length);
        }
    };

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            {/* Header Section */}
            <div className="home-container background-color min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
                <div className="input-section flex flex-col justify-center items-center p-4 md:p-8 w-full max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#175773] text-center mb-6 px-4">
                        The evolution of 24/7 study starts here
                    </h1>
                    <p className='text-center text-lg md:text-xl'>
                        Quick step-by-step solutions. When you need them.
                    </p>
                    <div className="flex flex-col md:flex-row text-center w-full md:w-5/6 mt-10 bg-white p-4 md:p-10 gap-4">
                        <input
                            type="file"
                            webkitdirectory="true"
                            directory="true"
                            onChange={handleUpload}
                            className="w-full p-2 border border-4 border-[#175773] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175773]"
                        />
                        <button className="w-full md:w-auto bg-[#349D69] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            {/* Three cards Section */}
            <div className='bg-[#1757733d] py-8 px-4 md:p-10'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                    {/* First Card */}
                    <div className='flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-white/50'>
                        <img src={correct_symble} alt="" className="w-12 h-12 md:w-16 md:h-16" />
                        <p className='font-bold text-center md:text-left'>Solutions backed by verified experts</p>
                    </div>
                    {/* Second Card */}
                    <div className='flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-white/50'>
                        <img src={list} alt="" className="w-12 h-12 md:w-16 md:h-16" />
                        <p className='font-bold text-center md:text-left'>Specialized tools to help master your courses</p>
                    </div>
                    {/* Third Card */}
                    <div className='flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-white/50'>
                        <img src={lamp} alt="" className="w-12 h-12 md:w-16 md:h-16" />
                        <p className='font-bold text-center md:text-left'>Tailored to support the way you learn</p>
                        <button className='w-full md:w-auto mt-4 md:mt-0 bg-[#349D69] text-white font-bold px-6 py-3 rounded-full hover:bg-[#175773] transition-colors'>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* about content */}
            <div className='container mx-auto px-4 py-12'>
                <div className='flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto'>
                    <div className='w-full md:w-1/2'>
                        <img src={blogimg} className="w-full rounded-lg shadow-lg" alt="Blog" />
                    </div>
                    <div className='w-full md:w-1/2 space-y-4'>
                        <p className='font-bold text-2xl md:text-4xl'>
                            91% of Chegg customers say they get better grades when they use Chegg to understand their coursework1
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-[#1757733d] py-12 px-4'>
                <div className='max-w-7xl mx-auto space-y-8'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center'>Thousands of Subjects</h1>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
                        {Array(8).fill('MCT').map((subject, index) => (
                            <div key={index} className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                                <h1 className='text-lg md:text-xl font-bold text-center'>{subject}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* start learning */}
            <div className='relative w-full min-h-[400px] md:min-h-[500px]'>
                <img src={bg} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
                <div className='relative z-10 flex flex-col justify-center items-center min-h-[400px] md:min-h-[500px] text-center px-4 bg-black/30'>
                    <div className='max-w-4xl mx-auto text-white'>
                        <h1 className='font-bold text-2xl md:text-4xl mb-4'>Get instant study help</h1>
                        <p className='text-lg md:text-2xl mb-8'>
                            From your first assignment to your final exam, get the right tools designed to help you learn.
                        </p>
                        <button className='bg-[#349D69] text-white font-bold px-8 py-4 rounded-full hover:bg-[#175773] transition-colors'>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            {/* what type work */}
            <div className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-4xl font-semibold text-center mb-8">
                        Practice questions made for you from any material in any language
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {materials.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <span className="text-3xl">{item.icon}</span>
                                <span className="font-bold text-lg">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;