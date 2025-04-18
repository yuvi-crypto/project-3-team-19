import React from 'react';
import blogimg from '../assets/blogimg.webp';
import correct_symble from '../assets/correct_symble.webp';
import list from '../assets/list.webp';
import lamp from '../assets/lamp.webp';

const About = () => {
    const features = [
        {
            title: "Smart Question Generation",
            description: "Our AI algorithms analyze your study materials to create relevant and challenging questions.",
            icon: correct_symble
        },
        {
            title: "Multiple Formats",
            description: "Support for various document types including PDFs, PowerPoint, and text files.",
            icon: list
        },
        {
            title: "Personalized Learning",
            description: "Adaptive system that learns from your performance and adjusts difficulty accordingly.",
            icon: lamp
        }
    ];

    const milestones = [
        "Launched our platform in 2016",
        "Reached 1 million users in 2018",
        "Introduced AI-powered learning in 2020",
        "Expanded to mobile platforms in 2021",
        "Released advanced analytics in 2022",
        "Global expansion across 50+ countries in 2023"
    ];

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            {/* Header Section */}
            <div className="background-color min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
                <div className="flex flex-col justify-center items-center p-4 md:p-8 w-full max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#175773] text-center mb-6">
                        Transforming Education Through Technology
                    </h1>
                    <p className='text-center text-lg md:text-xl mb-8 max-w-3xl'>
                        We're on a mission to make learning accessible, engaging, and effective for students worldwide.
                    </p>
                    
                    {/* About Image Section */}
                    <div className='flex flex-col md:flex-row items-center gap-8 mt-8'>
                        <div className='w-full md:w-1/2'>
                            <img src={blogimg} alt="About Us" className="w-full rounded-lg shadow-lg" />
                        </div>
                        <div className='w-full md:w-1/2 space-y-4'>
                            <h2 className='text-2xl font-bold text-[#175773]'>Our Story</h2>
                            <p className='text-lg'>
                                Starting from a simple idea to help students learn better, we've grown into a comprehensive learning platform that serves millions of users worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className='bg-[#1757733d] py-12 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='text-3xl font-bold text-center text-[#175773] mb-12'>Our Features</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {features.map((feature, index) => (
                            <div key={index} className='bg-white/50 p-6 rounded-lg shadow-lg'>
                                <img src={feature.icon} alt="" className="w-16 h-16 mb-4" />
                                <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Milestones Section */}
            <div className='py-12 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='text-3xl font-bold text-center text-[#175773] mb-12'>Our Journey</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {milestones.map((milestone, index) => (
                            <div key={index} className='bg-[#1757733d] p-6 rounded-lg'>
                                <p className='text-lg font-medium'>{milestone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className='bg-[#175773] text-white py-16 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-3xl font-bold mb-6'>Ready to Start Learning?</h2>
                    <p className='text-lg mb-8'>Join millions of students who are already transforming their learning experience</p>
                    <button className='bg-[#349D69] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#2b8056] transition-colors'>
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;