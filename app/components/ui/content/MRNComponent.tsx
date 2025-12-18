import React, { useState } from 'react';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import initialInventory from '../../../data/parts-inventory.json';
import mrnData from '~/data/mrn-data.json';
import Pagination from '~/components/ui/Pagination';


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

const MOCK_PARTS_DATA: Record<string, Part[]> = mrnData.mockPartsData as unknown as Record<string, Part[]>;

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
    const [history, setHistory] = useState<MRNHistoryItem[]>(mrnData.initialHistory as MRNHistoryItem[]);
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

    // Pagination State
    const [historyPage, setHistoryPage] = useState(1);
    const [inventoryPage, setInventoryPage] = useState(1);
    const itemsPerPage = 5;

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

    // Pagination Logic Helper
    const getPaginatedData = <T,>(data: T[], page: number) => {
        const start = (page - 1) * itemsPerPage;
        return {
            currentItems: data.slice(start, start + itemsPerPage),
            totalPages: Math.ceil(data.length / itemsPerPage),
            totalItems: data.length
        };
    };

    const historyPagination = getPaginatedData(history, historyPage);
    const inventoryPagination = getPaginatedData(inventory, inventoryPage);

    return (
        <div className="p-6 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="mb-6 flex justify-between items-end flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-white leading-none">Material Receipt Note</h2>
                        <MRNIcon />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-700 mb-6 flex-shrink-0">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`pb-2 px-1 text-sm font-medium transition-all relative ${activeTab === 'create' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Create MRN
                    {activeTab === 'create' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 px-1 text-sm font-medium transition-all relative ${activeTab === 'history' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    MRN History
                    {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('inventory')}
                    className={`pb-2 px-1 text-sm font-medium transition-all relative ${activeTab === 'inventory' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Current Stock
                    {activeTab === 'inventory' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />}
                </button>
            </div>

            {/* Content: Create MRN */}
            {activeTab === 'create' && (
                <div className="flex-1 overflow-y-auto animate-fade-in-up">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT COLUMN: Input & Search */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Invoice Search Card */}
                            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    1. Find Invoice / PO
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 mb-1.5 text-sm font-medium">Invoice No. / PO ID</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <Input
                                                    variant="text"
                                                    value={invoiceNo}
                                                    onChange={(e) => setInvoiceNo(e.target.value)}
                                                    placeholder="e.g. INV-2025-001"
                                                />
                                            </div>
                                            <button
                                                onClick={handleSearch}
                                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors h-[44px]"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                    {searchError && (
                                        <div className="bg-red-900/20 text-red-400 p-3 rounded-lg text-sm border border-red-900/50">
                                            ⚠️ {searchError}
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-500 bg-gray-900/50 p-3 rounded border border-gray-800">
                                        <p className="font-semibold mb-1">Try searching for:</p>
                                        <div className="flex gap-2">
                                            <span className="bg-gray-800 px-2 py-1 rounded text-gray-300 cursor-pointer hover:text-white" onClick={() => setInvoiceNo('INV-2025-001')}>INV-2025-001</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-gray-300 cursor-pointer hover:text-white" onClick={() => setInvoiceNo('INV-2025-002')}>INV-2025-002</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MRN Details Card */}
                            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    2. MRN Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-400 mb-1.5 text-sm font-medium">MRN Type</label>
                                        <select
                                            value={mrnType}
                                            onChange={(e) => setMrnType(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg !text-white focus:outline-none focus:border-orange-500 appearance-none"
                                        >
                                            <option>Against Delivery challan</option>
                                            <option>Cash MRN</option>
                                            <option>Credit MRN</option>
                                        </select>
                                    </div>
                                    <Input
                                        variant="date"
                                        label="MRN Date"
                                        value={mrnDate}
                                        disabled={true}
                                        className="!text-gray-400 cursor-not-allowed bg-gray-900/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Stock Details & Summary */}
                        <div className="lg:col-span-2 flex flex-col h-full">
                            {parts.length > 0 ? (
                                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex flex-col h-full">
                                    <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/80 backdrop-blur flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            3. Review Stock Items
                                        </h3>
                                        <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium text-gray-300">
                                            {parts.length} Items Found
                                        </span>
                                    </div>

                                    <div className="flex-1 overflow-x-auto min-h-0">
                                        <table className="w-full text-left text-gray-300">
                                            <thead className="text-xs uppercase bg-gray-900/50 text-gray-400 sticky top-0 backdrop-blur-sm z-10">
                                                <tr>
                                                    <th className="px-6 py-3">Part No</th>
                                                    <th className="px-6 py-3">Description</th>
                                                    <th className="px-6 py-3 text-right">Qty</th>
                                                    <th className="px-6 py-3 text-right">Amount</th>
                                                    <th className="px-6 py-3 text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                {parts.map((part) => (
                                                    <tr key={part.id} className="hover:bg-gray-700/30 transition-colors">
                                                        <td className="px-6 py-4 text-white font-medium">{part.partNumber}</td>
                                                        <td className="px-6 py-4 text-sm max-w-[200px] truncate" title={part.description}>{part.description}</td>
                                                        <td className="px-6 py-4 text-right">{part.qty}</td>
                                                        <td className="px-6 py-4 text-right">Rp {part.amount.toLocaleString()}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <select
                                                                value={part.status}
                                                                onChange={(e) => handleStatusChange(part.id, e.target.value as Part['status'])}
                                                                className={`text-xs font-semibold px-2 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${part.status === 'Accepted' ? 'bg-green-900/30 text-green-400 border-green-800' :
                                                                    part.status === 'Damaged' ? 'bg-red-900/30 text-red-400 border-red-800' :
                                                                        'bg-blue-900/30 text-blue-400 border-blue-800'
                                                                    }`}
                                                            >
                                                                <option value="Pending" className="bg-gray-800 text-gray-300">Pending</option>
                                                                <option value="Accepted" className="bg-gray-800 text-green-400 font-bold">Accepted</option>
                                                                <option value="Damaged" className="bg-gray-800 text-red-400 font-bold">Damaged</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Footer Summary */}
                                    <div className="p-6 border-t border-gray-700 bg-gray-900/30">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <p className="text-sm text-gray-400">Total Value</p>
                                                <p className="text-2xl font-bold text-white">
                                                    Rp {parts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-400">Items to Receive</p>
                                                <p className="text-2xl font-bold text-white">{parts.filter(p => p.status === 'Accepted').length} <span className="text-sm font-normal text-gray-500">of {parts.length}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button variant="secondary" size="lg" onClick={() => setParts([])} className="flex-1">Discard</Button>
                                            <Button variant="primary" size="lg" onClick={handleSubmit} disabled={isSubmitting} className="flex-[2]">
                                                {isSubmitting ? 'Processing...' : 'Confirm Receipt'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center p-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700 text-center">
                                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">No Items Loaded</h3>
                                    <p className="text-gray-400 max-w-xs mx-auto">
                                        Please search for a valid Invoice or PO number on the left to load stock items.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Content: MRN History */}
            {activeTab === 'history' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg animate-fade-in-up flex flex-col">
                    <div className="overflow-x-auto">
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
                                {historyPagination.currentItems.map((item) => (
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
                    {/* Pagination for History */}
                    {historyPagination.totalItems > 0 && (
                        <div className="px-6 border-t border-gray-700">
                            <Pagination
                                currentPage={historyPage}
                                totalPages={historyPagination.totalPages}
                                onPageChange={setHistoryPage}
                                totalItems={historyPagination.totalItems}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Content: Current Stock */}
            {activeTab === 'inventory' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg animate-fade-in-up flex flex-col">
                    <div className="overflow-x-auto">
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
                                {inventoryPagination.currentItems.map((item) => (
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
                    {/* Pagination for Inventory */}
                    {inventoryPagination.totalItems > 0 && (
                        <div className="px-6 border-t border-gray-700">
                            <Pagination
                                currentPage={inventoryPage}
                                totalPages={inventoryPagination.totalPages}
                                onPageChange={setInventoryPage}
                                totalItems={inventoryPagination.totalItems}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MRNComponent;
