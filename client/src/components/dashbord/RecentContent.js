import React from 'react'

function RecentContent() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="space-y-4">
                    {/* Add your recent activity items here */}
                    <div className="p-4 border-b">
                        <p className="font-semibold">Last Question Asked</p>
                        <p className="text-gray-600">2 hours ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentContent