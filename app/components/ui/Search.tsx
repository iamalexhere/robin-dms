import React from "react";

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function Search({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
}: SearchProps) {
    return (
        <div
            className={`flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg shadow-sm border border-gray-700 ${className}`}
        >
            {/* Icon Search */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>

            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            />
        </div>
    );
}