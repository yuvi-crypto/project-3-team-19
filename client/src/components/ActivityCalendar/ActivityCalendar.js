import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { mockActivityData } from './mockData';

const ActivityCalendar = () => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [activityData, setActivityData] = useState({});

    useEffect(() => {
        setActivityData(mockActivityData);
        const loginTime = localStorage.getItem('loginTime');
        
        const updateTimeSpent = () => {
            const currentTime = new Date();
            const loginDateTime = new Date(loginTime);
            const diffInMinutes = Math.floor((currentTime - loginDateTime) / (1000 * 60));
            setTimeSpent(diffInMinutes);
        };

        updateTimeSpent(); // Initial update
        const interval = setInterval(updateTimeSpent, 60000);

        return () => clearInterval(interval);
    }, []);

    const getColorForTime = (minutes) => {
        if (!minutes) return 'bg-white border border-gray-300';
        if (minutes < 30) return 'bg-green-100';
        if (minutes < 60) return 'bg-green-300';
        if (minutes < 120) return 'bg-green-500 text-white';
        return 'bg-red-500 text-white';
    };

    const tileClassName = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const minutes = activityData[dateStr];
        return getColorForTime(minutes);
    };

    const tileContent = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const minutes = activityData[dateStr];
        if (!minutes) return null;

        return (
            <div className="text-xs text-center">
                {Math.floor(minutes / 60)}h {minutes % 60}m
            </div>
        );
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Activity Tracking</h2>
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                    <span className="font-semibold">Today's Activity:</span>
                    <span className="ml-2 text-green-700">
                        {Math.floor(timeSpent / 60)}h {timeSpent % 60}m
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <Calendar
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                    value={new Date()}
                    className="border rounded-lg shadow-sm"
                />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 mr-2 rounded-full"></div>
                    <span className="text-sm text-gray-700">&lt;30m</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-300 mr-2 rounded-full"></div>
                    <span className="text-sm text-gray-700">30m-1h</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 mr-2 rounded-full"></div>
                    <span className="text-sm text-gray-700">1h-2h</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2 rounded-full"></div>
                    <span className="text-sm text-gray-700">&gt;2h</span>
                </div>
            </div>
        </div>
    );
};

export default ActivityCalendar;
