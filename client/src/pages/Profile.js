import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // Initialize state with userData from localStorage
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        if (!savedData) {
            navigate('/');
            return null;
        }
        const userData = JSON.parse(savedData);
        return {
            fullName: userData.name || '',
            userName: userData.userName || '',
            email: userData.email || '',
            age: userData.age || '',
            orgName: userData.orgName || '',
            stream: userData.stream || 'MBBS',
            referalCode: userData.referalCode || '',
            dailyLimit: userData.dailyLimit || '100',
            picture: userData.picture || '',
            access_token: userData.access_token || '',
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updatedData = {
                ...prev,
                [name]: value
            };

            // Update localStorage immediately
            localStorage.setItem('userData', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    if (!formData) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl">
                {/* Profile Header */}
                <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-blue-500 to-green-500">
                    <img
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
                        src={formData.picture || 'https://via.placeholder.com/150'}
                        alt="Profile"
                    />
                </div>

                {/* Profile Form */}
                <div className="pt-16 pb-8 px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                            <input
                                type="text"
                                name="orgName"
                                value={formData.orgName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stream</label>
                            <select
                                name="stream"
                                value={formData.stream}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="MBBS">MBBS</option>
                                <option value="UPSC">UPSC</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Referral Code</label>
                            <input
                                type="text"
                                name="referalCode"
                                value={formData.referalCode}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Daily Limit</label>
                            <input
                                type="number"
                                name="dailyLimit"
                                value={formData.dailyLimit}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
