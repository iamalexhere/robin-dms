import { useState } from 'react';

export default function Profile() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 hover:bg-white/10 rounded transition-colors relative"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span className="absolute top-1 right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full text-white font-bold bg-red-600">
                        1
                    </span>
                </button>

                {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg overflow-hidden z-50 bg-gray-900">
                        <div className="p-4 border-b border-white/10">
                            <p className="text-white font-semibold">Notifications</p>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-400 text-sm">No new notifications</p>
                        </div>
                    </div>
                )}
            </div>

            {/* User Menu */}
            <div className="relative">
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-white/10 rounded transition-colors"
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-600">
                        <span className="text-white text-sm font-semibold">N</span>
                    </div>
                    <span className="text-white">Name</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-white transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50 bg-gray-900">
                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors">
                            Profile
                        </button>
                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors">
                            Settings
                        </button>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors border-t border-white/10"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}