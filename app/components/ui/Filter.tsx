import React from "react";

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
    className?: string;
}

export default function Filter({
    value,
    onChange,
    options,
    placeholder = "Select option",
    className = "",
}: FilterProps) {
    return (
        <div
            className={`flex items-center bg-white px-4 py-2 rounded-full border border-gray-300 shadow-sm ${className}`}
        >
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent outline-none w-full text-gray-800"
            >
                {/* Placeholder option */}
                <option value="" disabled hidden>
                    {placeholder}
                </option>

                {/* Render options */}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}