import React from 'react';

// Simple SVG Icon untuk Users
const UsersIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const UserManagementContent = () => {
    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                    <UsersIcon />
                </div>
                <p className="text-gray-400">Manage users, roles, and permissions</p>
            </div>

            {/* Empty State */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-12 shadow-xl border border-gray-600 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-orange-500 bg-opacity-20 rounded-full p-6 mb-4">
                        <UsersIcon />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                    <p className="text-gray-400 mb-6">User management features will be available here</p>

                    {/* Placeholder Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Total Users</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Active Users</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">New This Month</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagementContent;