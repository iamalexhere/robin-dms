import React from 'react';

interface MISReport {
    id: number;
    name: string;
    lastUpdated: string;
    status: string;
    roles: string[];
}

interface MISWidgetProps {
    reports: MISReport[];
}

const MISWidget: React.FC<MISWidgetProps> = ({ reports }) => {
    if (reports.length === 0) {
        return null; // Hide widget if no reports
    }

    const handleNavigateToMIS = () => {
        // Placeholder for navigation to MIS Reports page
        alert('Navigate to MIS Reports page');
    };

    return (
        <div
            onClick={handleNavigateToMIS}
            className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-600 cursor-pointer hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-orange-400">MIS Reports</h3>
                <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>

            <div className="space-y-3 flex-1">
                {reports.slice(0, 3).map((report) => (
                    <div
                        key={report.id}
                        className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="text-white font-semibold text-sm mb-1">
                                    {report.name}
                                </h4>
                                <p className="text-amber-200 text-xs">
                                    Updated: {new Date(report.lastUpdated).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="ml-2">
                                <span className="inline-block px-2 py-1 bg-green-500 bg-opacity-20 text-green-300 text-xs font-semibold rounded">
                                    {report.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Indicator */}
            <div className="mt-4 text-center">
                <span className="text-orange-300 text-sm font-semibold">
                    Click to view all reports →
                </span>
            </div>
        </div>
    );
};

export default MISWidget;
