import React from 'react';

// Simple SVG Icon untuk Terms & Conditions
const TermsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

const TermsConditionsContent = () => {
    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
                    <TermsIcon />
                </div>
                <p className="text-gray-400">View and manage terms and conditions</p>
            </div>

            {/* Empty State */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-12 shadow-xl border border-gray-600 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-orange-500 bg-opacity-20 rounded-full p-6 mb-4">
                        <TermsIcon />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                    <p className="text-gray-400 mb-6">Terms & Conditions management will be available here</p>

                    {/* Placeholder Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Total Documents</p>
                            <p className="text-3xl font-bold text-white">--</p>
                        </div>
                        <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600">
                            <p className="text-amber-300 text-sm font-medium mb-2">Active Version</p>
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

export default TermsConditionsContent;