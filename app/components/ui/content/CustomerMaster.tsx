import React, { useState } from 'react';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import Pagination from '~/components/ui/Pagination';

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
    { id: '5', date: '2025-12-01', type: 'Service', referenceNo: 'RO-2025-300', amount: 12000, description: 'Brake Pad Replacement' },
    { id: '6', date: '2025-12-15', type: 'Sales', referenceNo: 'INV-2025-055', amount: 50000, description: 'Insurance Renewal' },
    { id: '7', date: '2026-01-10', type: 'Service', referenceNo: 'RO-2026-012', amount: 6000, description: 'Regular Checkup' },
    { id: '8', date: '2026-02-05', type: 'Parts', referenceNo: 'INV-PARTS-150', amount: 1500, description: 'Wiper Blades' },
    { id: '9', date: '2026-03-20', type: 'Service', referenceNo: 'RO-2026-088', amount: 25000, description: 'Major Service' },
    { id: '10', date: '2026-05-12', type: 'Parts', referenceNo: 'INV-PARTS-200', amount: 8000, description: 'Battery Replacement' },
];

const Customer360View = ({ history }: { history: TransactionHistory[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalItems = history.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentItems = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
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

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-700 flex-shrink-0 bg-gray-800/80 backdrop-blur">
                    <h3 className="text-lg font-bold text-white">Interaction History</h3>
                </div>
                <div className="overflow-x-auto text-gray-300">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead className="text-xs uppercase bg-gray-900/90 text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Type</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Reference</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Description</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium whitespace-nowrap">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${item.type === 'Sales' ? 'bg-green-950/40 text-green-400 border-green-800' :
                                            item.type === 'Service' ? 'bg-blue-950/40 text-blue-400 border-blue-800' :
                                                'bg-purple-950/40 text-purple-400 border-purple-800'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm">{item.referenceNo}</td>
                                    <td className="px-6 py-4 text-gray-400">{item.description}</td>
                                    <td className="px-6 py-4 text-right font-medium text-white">Rp {item.amount.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalItems > 0 && (
                    <div className="border-t border-gray-700 px-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

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
                        <Input
                            variant="text"
                            label="Customer ID"
                            name="id"
                            value={formData.id}
                            disabled={true}
                            className="!text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <Input
                            variant="text"
                            label="Customer Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={!isEditing ? 'text-gray-300' : ''}
                        />
                    </div>
                    <div>
                        <Input
                            variant="text"
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={!isEditing ? 'text-gray-300' : ''}
                        />
                    </div>
                    <div>
                        <Input
                            variant="text"
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={!isEditing ? 'text-gray-300' : ''}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Customer Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={(e) => handleChange(e as any)}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 !text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300 appearance-none' : 'border-gray-600'}`}
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
                            onChange={(e) => handleChange(e as any)}
                            disabled={!isEditing}
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 !text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300 appearance-none' : 'border-gray-600'}`}
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
                            className={`w-full bg-gray-900 border rounded-lg px-4 py-2 !text-white outline-none focus:border-orange-500 transition-colors ${!isEditing ? 'border-gray-700 text-gray-300' : 'border-gray-600'}`}
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
        <div className="p-6 h-full flex flex-col overflow-hidden">
            {/* Compact Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white leading-none">Customer Master</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Input
                            variant="text"
                            placeholder="Search Customer ID, Name, Phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                    </div>
                    <Button variant="primary" size="sm" onClick={handleSearch} className="whitespace-nowrap">
                        Search
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => {
                        setCustomer({ ...MOCK_CUSTOMER, id: 'NEW', name: '', phone: '', email: '', address: '', type: 'Individual', status: 'Active' });
                        setIsEditing(true);
                        setActiveTab('details');
                    }} className="whitespace-nowrap">
                        + New
                    </Button>
                </div>
            </div>

            {/* Compact Tabs */}
            <div className="flex gap-6 border-b border-gray-800 mb-4 flex-shrink-0">
                <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 px-1 text-sm font-medium transition-all relative ${activeTab === 'details' ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Customer Details
                    {activeTab === 'details' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('360')}
                    className={`pb-2 px-1 text-sm font-medium transition-all relative ${activeTab === '360' ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
                >
                    360° View
                    {activeTab === '360' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />}
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
