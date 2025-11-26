import React from 'react';

interface KPIMetric {
    id: number;
    name: string;
    value: string;
    trend: 'up' | 'down';
    change: string;
    roles: string[];
}

interface KPIWidgetProps {
    metrics: KPIMetric[];
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ metrics }) => {
    if (metrics.length === 0) {
        return null; // Hide widget if no metrics
    }

    const handleNavigateToKPI = () => {
        // Placeholder for navigation to KPI page
        alert('Navigate to KPI page');
    };

    return (
        <div
            onClick={handleNavigateToKPI}
            className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-600 cursor-pointer hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02]"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-orange-400">KPI Dashboard</h3>
                <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {metrics.slice(0, 4).map((metric) => (
                    <div
                        key={metric.id}
                        className="bg-black bg-opacity-30 rounded-xl p-3"
                    >
                        <p className="text-amber-300 text-xs font-medium mb-1">
                            {metric.name}
                        </p>
                        <p className="text-white font-bold text-lg mb-1">
                            {metric.value}
                        </p>
                        <div className="flex items-center gap-1">
                            {metric.trend === 'up' ? (
                                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            ) : (
                                <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            )}
                            <span className={`text-xs font-semibold ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                {metric.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Indicator */}
            <div className="mt-4 text-center">
                <span className="text-orange-300 text-sm font-semibold">
                    Click to view detailed KPI →
                </span>
            </div>
        </div>
    );
};

export default KPIWidget;
