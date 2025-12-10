import React, { useState } from 'react';
import { Button } from '~/components/ui/Button';
import initialInventory from '../../../data/parts-inventory.json';

// Types
interface Part {
    id: string;
    partNumber: string;
    description: string;
    uom: string;
    qty: number;
    rate: number;
    amount: number;
    status: 'Pending' | 'Accepted' | 'Damaged' | 'Short';
}

interface InventoryItem {
    id: string;
    partNumber: string;
    description: string;
    uom: string;
    stock: number;
    location: string;
}

interface MRNHistoryItem {
    id: string;
    mrnNo: string;
    mrnDate: string;
    invoiceNo: string;
    status: string;
    totalAmount: number;
    itemCount: number;
}

// Mock Data for Search
const MOCK_PARTS_DATA: Record<string, Part[]> = {
    'INV-2025-001': [
        { id: '1', partNumber: 'P-001', description: 'Oil Filter', uom: 'PCS', qty: 10, rate: 50000, amount: 500000, status: 'Pending' },
        { id: '2', partNumber: 'P-002', description: 'Air Filter', uom: 'PCS', qty: 5, rate: 75000, amount: 375000, status: 'Pending' },
        { id: '3', partNumber: 'P-003', description: 'Brake Pad', uom: 'SET', qty: 2, rate: 250000, amount: 500000, status: 'Pending' },
    ],
    'INV-2025-002': [
        { id: '4', partNumber: 'P-004', description: 'Spark Plug', uom: 'PCS', qty: 20, rate: 25000, amount: 500000, status: 'Pending' },
    ]
};

// Icons
const MRNIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 14l2 2 4-4" />
    </svg>
);

const MRNComponent = () => {
    // UI State
    const [activeTab, setActiveTab] = useState<'create' | 'history' | 'inventory'>('create');

    // Feature State
    const [history, setHistory] = useState<MRNHistoryItem[]>([
        { id: 'h1', mrnNo: 'MRN-2025-001', mrnDate: '2025-01-10', invoiceNo: 'INV-OLD-001', status: 'Completed', totalAmount: 1500000, itemCount: 5 }
    ]);
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

    // Form State
    const [mrnType, setMrnType] = useState('Credit MRN');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [mrnDate, setMrnDate] = useState(new Date().toISOString().split('T')[0]);
    const [invoiceDate, setInvoiceDate] = useState('');
    const [parts, setParts] = useState<Part[]>([]);
    const [searchError, setSearchError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Handlers
    const handleSearch = () => {
        setSearchError('');
        const data = MOCK_PARTS_DATA[invoiceNo];
        if (data) {
            setParts(JSON.parse(JSON.stringify(data)));
        } else {
            setParts([]);
            setSearchError('Invoice number not found. Try INV-2025-001 or INV-2025-002');
        }
    };

    const handleStatusChange = (id: string, newStatus: Part['status']) => {
        setParts(prev => prev.map(p =>
            p.id === id ? { ...p, status: newStatus } : p
        ));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            // 1. Add to History
            const newHistoryItem: MRNHistoryItem = {
                id: `h-${Date.now()}`,
                mrnNo: `MRN-${new Date().getFullYear()}-${String(history.length + 2).padStart(3, '0')}`,
                mrnDate: mrnDate,
                invoiceNo: invoiceNo,
                status: 'Completed',
                totalAmount: parts.reduce((sum, p) => sum + p.amount, 0),
                itemCount: parts.length
            };
            setHistory(prev => [newHistoryItem, ...prev]);

            // 2. Update Inventory
            const updatedInventory = [...inventory];
            parts.forEach(part => {
                if (part.status === 'Accepted' || part.status === 'Pending') { // Assuming pending is also received for now
                    const existingItemIndex = updatedInventory.findIndex(i => i.partNumber === part.partNumber);
                    if (existingItemIndex >= 0) {
                        updatedInventory[existingItemIndex].stock += part.qty;
                    } else {
                        // Add new item if not exists (simplified logic)
                        updatedInventory.push({
                            id: part.id,
                            partNumber: part.partNumber,
                            description: part.description,
                            uom: part.uom,
                            stock: part.qty,
                            location: 'NEW-LOC'
                        });
                    }
                }
            });
            setInventory(updatedInventory);

            // 3. Reset Form
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setParts([]);
            setInvoiceNo('');
            setInvoiceDate('');
            setTimeout(() => {
                setSubmitSuccess(false);
                setActiveTab('history'); // Switch to history view after success
            }, 2000);
        }, 1500);
    };

    return (
        <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-white">Material Receipt Note (MRN)</h2>
                        <MRNIcon />
                    </div>
                    <p className="text-gray-400">Receive stock, view history, and check inventory</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-700 mb-6">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`pb-3 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'create' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                >
                    Create MRN
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-3 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'history' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                >
                    MRN History
                </button>
                <button
                    onClick={() => setActiveTab('inventory')}
                    className={`pb-3 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'inventory' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                >
                    Current Stock
                </button>
            </div>

            {/* Content: Create MRN */}
            {activeTab === 'create' && (
                <div className="animate-fade-in-up">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Inputs similar to previous implementation... */}
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">MRN Type</label>
                                <select
                                    value={mrnType}
                                    onChange={(e) => setMrnType(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 appearance-none"
                                >
                                    <option>Against Delivery challan</option>
                                    <option>Cash MRN</option>
                                    <option>Credit MRN</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Invoice No. / PO ID</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={invoiceNo}
                                        onChange={(e) => setInvoiceNo(e.target.value)}
                                        placeholder="Enter: INV-2025-001"
                                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500"
                                    />
                                    <button onClick={handleSearch} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">Search</button>
                                </div>
                                {searchError && <p className="text-red-400 text-xs mt-1">{searchError}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">MRN Date</label>
                                <input type="date" value={mrnDate} readOnly className="w-full px-4 py-3 bg-gray-700/50 text-gray-400 rounded-lg border border-gray-600 cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    {submitSuccess && (
                        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            Stock successfully received! Redirecting to history...
                        </div>
                    )}

                    {parts.length > 0 && (
                        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                            <div className="px-6 py-4 border-b border-gray-700"><h3 className="text-lg font-bold text-white">Stock Details</h3></div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-gray-300">
                                    <thead className="text-xs uppercase bg-gray-900/50 text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Part No</th>
                                            <th className="px-6 py-3">Desc</th>
                                            <th className="px-6 py-3 text-right">Qty</th>
                                            <th className="px-6 py-3 text-right">Amount</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {parts.map((part) => (
                                            <tr key={part.id}>
                                                <td className="px-6 py-4 text-white">{part.partNumber}</td>
                                                <td className="px-6 py-4">{part.description}</td>
                                                <td className="px-6 py-4 text-right">{part.qty}</td>
                                                <td className="px-6 py-4 text-right">Rp {part.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={part.status}
                                                        onChange={(e) => handleStatusChange(part.id, e.target.value as Part['status'])}
                                                        className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Accepted">Accepted</option>
                                                        <option value="Damaged">Damaged</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
                                <Button variant="secondary" size="md" onClick={() => setParts([])}>Cancel</Button>
                                <Button variant="primary" size="md" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Submit to Stock'}</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Content: MRN History */}
            {activeTab === 'history' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg animate-fade-in-up">
                    <table className="w-full text-left text-gray-300">
                        <thead className="text-xs uppercase bg-gray-900 text-gray-400">
                            <tr>
                                <th className="px-6 py-3">MRN No</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Invoice No</th>
                                <th className="px-6 py-3 text-center">Items</th>
                                <th className="px-6 py-3 text-right">Total Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {history.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{item.mrnNo}</td>
                                    <td className="px-6 py-4">{item.mrnDate}</td>
                                    <td className="px-6 py-4">{item.invoiceNo}</td>
                                    <td className="px-6 py-4 text-center">{item.itemCount}</td>
                                    <td className="px-6 py-4 text-right">Rp {item.totalAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300 border border-green-700">{item.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Content: Current Stock */}
            {activeTab === 'inventory' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg animate-fade-in-up">
                    <table className="w-full text-left text-gray-300">
                        <thead className="text-xs uppercase bg-gray-900 text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Part Number</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">UOM</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3 text-right">Current Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{item.partNumber}</td>
                                    <td className="px-6 py-4">{item.description}</td>
                                    <td className="px-6 py-4">{item.uom}</td>
                                    <td className="px-6 py-4 text-orange-400">{item.location}</td>
                                    <td className="px-6 py-4 text-right font-bold text-white">{item.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MRNComponent;
