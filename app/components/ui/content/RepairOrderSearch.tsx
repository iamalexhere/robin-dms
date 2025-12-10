import React from 'react';

const RepairOrderSearch = () => {
    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Repair Order Search</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <p>Search mechanism for Repair Orders.</p>
                {/* Placeholder for now */}
                <div className="mt-4">
                    <input type="text" placeholder="Search by Reg No, Chassis, Customer ID..." className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
                </div>
            </div>
        </div>
    );
};

export default RepairOrderSearch;
