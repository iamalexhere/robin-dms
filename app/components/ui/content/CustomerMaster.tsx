import React from 'react';

const CustomerMaster = () => {
    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Customer Master</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <p>Customer details and 360 view will be implemented here.</p>
                {/* Placeholder for now */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded">
                        <h3 className="font-semibold mb-2">Customer Details</h3>
                        <p className="text-sm text-gray-400">ID, Name, Address, etc.</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                        <h3 className="font-semibold mb-2">360 View</h3>
                        <p className="text-sm text-gray-400">Transactions, History, etc.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerMaster;
