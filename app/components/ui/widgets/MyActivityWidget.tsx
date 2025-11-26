import React from 'react';

interface Activity {
    id: number;
    module: string;
    serialNo: string;
    description: string;
    count: number;
    roles: string[];
}

interface MyActivityWidgetProps {
    activities: Activity[];
}

const MyActivityWidget: React.FC<MyActivityWidgetProps> = ({ activities }) => {
    if (activities.length === 0) {
        return null; // Hide widget if no activities
    }

    return (
        <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-600">
            <h3 className="text-xl font-bold text-orange-400 mb-4">My Activity</h3>

            <div className="space-y-3">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-orange-400 font-semibold text-sm">
                                        {activity.module}
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                        {activity.serialNo}
                                    </span>
                                </div>
                                <p className="text-white text-sm mb-2">
                                    {activity.description}
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <div className="bg-orange-500 bg-opacity-20 rounded-full px-3 py-1">
                                    <span className="text-orange-300 font-bold text-sm">
                                        {activity.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyActivityWidget;
