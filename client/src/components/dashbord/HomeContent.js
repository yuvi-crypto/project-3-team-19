import { BsImage, BsCalculator } from 'react-icons/bs';
import { BiSend } from "react-icons/bi";
import ActivityCalendar from '../ActivityCalendar';

function HomeContent() {
    const userData = JSON.parse(localStorage.getItem('userData')) || { name: 'Guest' };
    localStorage.setItem('loginTime', new Date().toISOString());

    const featureCards = [
        { title: '100 million+', subtitle: 'Expert solutions' },
        { title: '24/7', subtitle: 'Expert help' },
        { title: 'Save', subtitle: 'Solutions for study time' },
    ];

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, {userData?.name?.split(' ')[0]}!
                </h1>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="What would you like help with today?"
                        className="w-full p-4 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <BsImage className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <BsCalculator className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <BiSend className="w-5 h-5 text-green-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Study smarter with MasterMind
                </h2>
                <p className="text-gray-600 mb-8">
                    Get better grades with unlimited access to expert solutions and study resources.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featureCards.map((card, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-bold text-green-500 mb-2">
                                {card.title}
                            </h3>
                            <p className="text-gray-600">{card.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Activity Calendar Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
                <ActivityCalendar />
            </div>
        </div>
    );
}

export default HomeContent;