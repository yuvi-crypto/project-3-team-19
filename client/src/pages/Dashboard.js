import React, { useState, useEffect } from 'react';
import { BiHomeAlt, BiMessageDetail, BiHistory, BiFolder, BiGift, BiBook, BiMenu, BiX } from 'react-icons/bi';
import HomeContent from '../components/dashbord/HomeContent';
import ExpertContent from '../components/dashbord/ExpertContent';
import RecentContent from '../components/dashbord/RecentContent';
import MyStuffContent from '../components/dashbord/MyStuffContent';
import FlashCardsContent from '../components/dashbord/FlashCardsContent';
import LearningLabContent from '../components/dashbord/LearningLabContent';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem('activeSection') || 'Home';
    });
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData')) || { name: 'Guest' };
    
    // Update localStorage when activeSection changes
    useEffect(() => {
        localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    const featureCards = [
        { title: '100 million+', subtitle: 'Expert solutions' },
        { title: '24/7', subtitle: 'Expert help' },
        { title: 'Save', subtitle: 'Solutions for study time' },
    ];

    const sidebarItems = [
        { icon: <BiHomeAlt className="w-6 h-6" />, label: 'Home', content: <HomeContent /> },
        { icon: <BiMessageDetail className="w-6 h-6" />, label: 'Quick Preparation', content: <ExpertContent /> },
        { icon: <BiHistory className="w-6 h-6" />, label: 'Your library', content: <RecentContent /> },
        { icon: <BiFolder className="w-6 h-6" />, label: 'Study guide', content: <MyStuffContent /> },
        { icon: <BiGift className="w-6 h-6" />, label: 'Flash cards', content: <FlashCardsContent /> },
        { icon: <BiBook className="w-6 h-6" />, label: 'Practice test', content: <LearningLabContent /> },
    ];

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Mobile Menu Button */}
            <button 
                onClick={toggleSidebar}
                className="md:hidden fixed top-20 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
            >
                {isSidebarOpen ? <BiX size={24} /> : <BiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed md:static w-64 bg-gray-900 text-white h-full z-40 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 top-16
            `}>
                <div className="p-4 overflow-y-auto h-screen">
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 
                                ${activeSection === item.label ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                            onClick={() => {
                                setActiveSection(item.label);
                                if (window.innerWidth < 768) setSidebarOpen(false);
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 pt-20 md:pt-16">
                <div className="max-w-7xl mx-auto">
                    {sidebarItems.find(item => item.label === activeSection)?.content}
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;