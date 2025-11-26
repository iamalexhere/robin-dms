import React from 'react';

interface Birthday {
    id: number;
    employeeName: string;
    date: string;
    department: string;
    position: string;
    roles: string[];
}

interface BirthdayCalendarWidgetProps {
    birthdays: Birthday[];
}

const BirthdayCalendarWidget: React.FC<BirthdayCalendarWidgetProps> = ({ birthdays }) => {
    if (birthdays.length === 0) {
        return null; // Hide widget if no birthdays
    }

    const handleSendWishes = (employeeName: string) => {
        // Placeholder for send wishes functionality
        alert(`Send birthday wishes to ${employeeName}!`);
    };

    return (
        <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-600">
            <h3 className="text-xl font-bold text-orange-400 mb-4">Birthday Calendar</h3>

            <div className="space-y-3">
                {birthdays.map((birthday) => (
                    <div
                        key={birthday.id}
                        className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Birthday Icon */}
                                <div className="bg-orange-500 bg-opacity-20 rounded-full p-3">
                                    <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                    </svg>
                                </div>

                                {/* Employee Info */}
                                <div>
                                    <h4 className="text-white font-bold text-base">
                                        {birthday.employeeName}
                                    </h4>
                                    <p className="text-amber-200 text-sm">
                                        {birthday.position} • {birthday.department}
                                    </p>
                                    <p className="text-orange-300 text-xs font-semibold mt-1">
                                        {new Date(birthday.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Send Wishes Button */}
                            <button
                                onClick={() => handleSendWishes(birthday.employeeName)}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Send Wishes
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BirthdayCalendarWidget;
