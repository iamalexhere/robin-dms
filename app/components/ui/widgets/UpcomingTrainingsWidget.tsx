import React, { useState, useEffect } from 'react';

interface Training {
    id: number;
    name: string;
    date: string;
    description: string;
    roles: string[];
}

interface UpcomingTrainingsWidgetProps {
    trainings: Training[];
}

const UpcomingTrainingsWidget: React.FC<UpcomingTrainingsWidgetProps> = ({ trainings }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll functionality
    useEffect(() => {
        if (trainings.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % trainings.length);
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval);
    }, [trainings.length]);

    if (trainings.length === 0) {
        return null; // Hide widget if no trainings
    }

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + trainings.length) % trainings.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % trainings.length);
    };

    const currentTraining = trainings[currentIndex];

    return (
        <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-600">
            <h3 className="text-xl font-bold text-orange-400 mb-4">Upcoming Trainings</h3>

            <div className="relative">
                {/* Training Card */}
                <div className="bg-black bg-opacity-30 rounded-xl p-5 min-h-[140px]">
                    <h4 className="text-white font-bold text-lg mb-2">
                        {currentTraining.name}
                    </h4>
                    <p className="text-amber-200 text-sm mb-3">
                        {currentTraining.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-orange-300 font-semibold text-sm">
                            {new Date(currentTraining.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>

                {/* Navigation Controls */}
                {trainings.length > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={handlePrevious}
                            className="p-2 bg-orange-500 bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                        >
                            <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {trainings.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-orange-400 w-6'
                                            : 'bg-orange-400 bg-opacity-30'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="p-2 bg-orange-500 bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                        >
                            <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingTrainingsWidget;
