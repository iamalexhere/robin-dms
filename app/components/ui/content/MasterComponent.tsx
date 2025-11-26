import React from 'react';

// Simple SVG Icon untuk Masters/Database
const MastersIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);

const MastersContent = () => {
    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-white">Masters</h2>
                    <MastersIcon />
                </div>
                <p className="text-gray-400">Manage master data and configurations</p>
            </div>

            {/* Empty State */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-12 shadow-xl border border-gray-600 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-orange-500 bg-opacity-20 rounded-full p-6 mb-4">
                        <MastersIcon />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                    <p className="text-gray-400 mb-6">Master data management features will be available here</p>

                    {/* Placeholder Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Data Tables</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Records</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Last Updated</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MastersContent;