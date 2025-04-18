import React from 'react'

function MyStuffContent() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Stuff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Saved Solutions</h3>
                    {/* Add your saved solutions content */}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">My Notes</h3>
                    {/* Add your notes content */}
                </div>
            </div>
        </div>
    );
}

export default MyStuffContent