import React, { useState } from 'react';
import { Button } from '~/components/ui/Button';

// Types
interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    type: 'Individual' | 'Corporate';
    pan?: string;
    gst?: string;
    status: 'Active' | 'Inactive';
}

interface TransactionHistory {
    id: string;
    date: string;
    type: string;
    referenceNo: string;
    amount: number;
    description: string;
}

// Mock Data
const MOCK_CUSTOMER: Customer = {
    id: 'CUST-2025-001',
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    address: '123, Main Street, MG Road, Bangalore - 560001',
    type: 'Individual',
    pan: 'ABCDE1234F',
    status: 'Active'
};

const MOCK_HISTORY: TransactionHistory[] = [
    { id: '1', date: '2025-01-15', type: 'Sales', referenceNo: 'INV-2025-001', amount: 1500000, description: 'Purchase of New Vehicle - SUV Model X' },
    { id: '2', date: '2025-04-20', type: 'Service', referenceNo: 'RO-2025-101', amount: 5000, description: '1st Free Service' },
    { id: '3', date: '2025-08-10', type: 'Service', referenceNo: 'RO-2025-245', amount: 8500, description: 'General Service & Oil Change' },
    { id: '4', date: '2025-11-05', type: 'Parts', referenceNo: 'INV-PARTS-099', amount: 2500, description: 'Purchase of Accessories' },
];

const Customer360View = ({ history }: { history: TransactionHistory[] }) => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                <p className="text-gray-400 text-sm">Total Spend</p>
                <p className="text-2xl font-bold text-white">Rp {history.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                <p className="text-gray-400 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-white">{history.length}</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                <p className="text-gray-400 text-sm">Last Visit</p>
                <p className="text-2xl font-bold text-white">{history[history.length - 1]?.date || 'N/A'}</p>
            </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Interaction History</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-900/50 text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Reference</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-700/30">
                                <td className="px-6 py-4 text-white font-medium">{item.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.type === 'Sales' ? 'bg-green-900 text-green-300 border border-green-700' :
                                            item.type === 'Service' ? 'bg-blue-900 text-blue-300 border border-blue-700' :
                                                'bg-purple-900 text-purple-300 border border-purple-700'
                                        }`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{item.referenceNo}</td>
                                <td className="px-6 py-4 text-gray-400">{item.description}</td>
                                <td className="px-6 py-4 text-right">Rp {item.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const CustomerForm = ({ customer, isEditing, onEdit, onSave, onCancel }: {
    customer: Customer,
    isEditing: boolean,
    onEdit: () => void,
    onSave: (data: Customer) => void,
    onCancel: () => void
}) => {
    const [formData, setFormData] = useState<Customer>(customer);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in-up">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Basic Information</h3>
                    {!isEditing && (
                        <Button type="button" variant="primary" size="sm" onClick={onEdit}>
                            Edit Details
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Customer ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            disabled
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Customer Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300' : 'border-gray-600'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300' : 'border-gray-600'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300' : 'border-gray-600'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Customer Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300 appearance-none' : 'border-gray-600'}`}
                        >
                            <option value="Individual">Individual</option>
                            <option value="Corporate">Corporate</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300 appearance-none' : 'border-gray-600'}`}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={3}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300' : 'border-gray-600'}`}
                        />
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">Save Changes</Button>
                </div>
            )}
        </form>
    );
};

const CustomerMaster = () => {
    const [activeTab, setActiveTab] = useState<'details' | '360'>('details');
    const [isEditing, setIsEditing] = useState(false);
    const [customer, setCustomer] = useState<Customer>(MOCK_CUSTOMER);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Mock search functionality
        if (searchTerm === 'CUST-2025-001' || searchTerm.toLowerCase() === 'john') {
            setCustomer(MOCK_CUSTOMER);
        } else {
            // Reset or show not found (simplified for mock)
            alert('Customer not found (Try "John" or "CUST-2025-001")');
        }
    };

    const handleSave = (updatedData: Customer) => {
        setCustomer(updatedData);
        setIsEditing(false);
    };

    return (
        <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-white">Customer Master</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-gray-400">Manage customer details and view 360° history</p>
            </div>

            {/* Global Search */}
            <div className="flex gap-4 mb-8 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
                <input
                    type="text"
                    placeholder="Search by Customer ID, Name, Phone or Email..."
                    className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch}>
                    Search Customer
                </Button>
                <Button variant="secondary" onClick={() => {
                    setCustomer({ ...MOCK_CUSTOMER, id: 'NEW', name: '', phone: '', email: '', address: '', type: 'Individual', status: 'Active' });
                    setIsEditing(true);
                    setActiveTab('details');
                }}>
                    + New Customer
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-700 mb-6">
                <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-3 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'details' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                    Customer Details
                </button>
                <button
                    onClick={() => setActiveTab('360')}
                    className={`pb-3 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === '360' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                    360° View
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'details' ? (
                    <CustomerForm
                        customer={customer}
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                        onSave={handleSave}
                        onCancel={() => { setIsEditing(false); setCustomer(MOCK_CUSTOMER); }}
                    />
                ) : (
                    <Customer360View history={MOCK_HISTORY} />
                )}
            </div>
        </div>
    );
};

export default CustomerMaster;
