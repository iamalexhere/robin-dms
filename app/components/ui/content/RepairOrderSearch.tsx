import React, { useState } from 'react';
import { Button } from '~/components/ui/Button';

// Types
interface RepairOrder {
    id: string;
    roDate: string;
    regNo: string;
    chassisNo: string;
    customerName: string;
    vehicleModel: string;
    status: 'Open' | 'WIP' | 'Completed' | 'Invoiced' | 'Delivered';
    advisor: string;
    estimatedAmt: number;
}

// Mock Data
const MOCK_ORDERS: RepairOrder[] = [
    { id: 'RO-2025-1001', roDate: '2025-12-01', regNo: 'KA-01-AB-1234', chassisNo: 'MZ1234567890', customerName: 'Rajesh Kumar', vehicleModel: 'XUV 700', status: 'WIP', advisor: 'Amit Singh', estimatedAmt: 8500 },
    { id: 'RO-2025-1002', roDate: '2025-12-02', regNo: 'KA-05-XY-9876', chassisNo: 'MZ0987654321', customerName: 'Sneha Gupta', vehicleModel: 'Thar', status: 'Completed', advisor: 'John D', estimatedAmt: 12000 },
    { id: 'RO-2025-1003', roDate: '2025-12-03', regNo: 'KA-51-MM-5555', chassisNo: 'MZ1122334455', customerName: 'Arun Verma', vehicleModel: 'Scorpio N', status: 'Delivered', advisor: 'Amit Singh', estimatedAmt: 5400 },
    { id: 'RO-2025-1004', roDate: '2025-12-04', regNo: 'KA-03-ZZ-1111', chassisNo: 'MZ9988776655', customerName: 'Priya Mehta', vehicleModel: 'XUV 300', status: 'Open', advisor: 'Sarah Khan', estimatedAmt: 3500 },
    { id: 'RO-2025-1005', roDate: '2025-12-05', regNo: 'MH-12-PQ-2222', chassisNo: 'MZ5544332211', customerName: 'Vikram Singh', vehicleModel: 'Bolero', status: 'Invoiced', advisor: 'John D', estimatedAmt: 15000 },
];

const OrderStatusBadge = ({ status }: { status: RepairOrder['status'] }) => {
    const styles = {
        Open: 'bg-gray-700 text-gray-300 border-gray-600',
        WIP: 'bg-blue-900 text-blue-300 border-blue-700',
        Completed: 'bg-green-900 text-green-300 border-green-700',
        Invoiced: 'bg-purple-900 text-purple-300 border-purple-700',
        Delivered: 'bg-orange-900 text-orange-300 border-orange-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
            {status}
        </span>
    );
};

const RepairOrderSearch = () => {
    // Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Data State
    const [orders, setOrders] = useState<RepairOrder[]>(MOCK_ORDERS);

    const handleSearch = () => {
        let filtered = MOCK_ORDERS;

        // Text Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(o =>
                o.regNo.toLowerCase().includes(q) ||
                o.chassisNo.toLowerCase().includes(q) ||
                o.customerName.toLowerCase().includes(q) ||
                o.id.toLowerCase().includes(q)
            );
        }

        // Date Filter
        if (dateFrom) {
            filtered = filtered.filter(o => o.roDate >= dateFrom);
        }
        if (dateTo) {
            filtered = filtered.filter(o => o.roDate <= dateTo);
        }

        // Status Filter
        if (statusFilter !== 'All') {
            filtered = filtered.filter(o => o.status === statusFilter);
        }

        setOrders(filtered);
    };

    const handleReset = () => {
        setSearchQuery('');
        setDateFrom('');
        setDateTo('');
        setStatusFilter('All');
        setOrders(MOCK_ORDERS);
    };

    return (
        <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-white">Repair Order Search</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-gray-400">Search and view repair order details history</p>
            </div>

            {/* Filter Section */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="lg:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Search Term</label>
                        <input
                            type="text"
                            placeholder="Reg No, Chassis No, or Customer Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white! focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">From Date</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white! focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">To Date</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white! focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 appearance-none"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="WIP">WIP</option>
                            <option value="Completed">Completed</option>
                            <option value="Invoiced">Invoiced</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="lg:col-span-3 flex gap-4 justify-end">
                        <Button variant="secondary" onClick={handleReset}>Reset</Button>
                        <Button variant="primary" onClick={handleSearch} className="px-8">Search Orders</Button>
                    </div>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex-1 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Search Results</h3>
                    <span className="text-sm text-gray-400">{orders.length} orders found</span>
                </div>
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left text-gray-300">
                        <thead className="text-xs uppercase bg-gray-900 text-gray-400 sticky top-0">
                            <tr>
                                <th className="px-6 py-3">RO Number</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Reg No.</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Vehicle</th>
                                <th className="px-6 py-3">Advisor</th>
                                <th className="px-6 py-3 text-right">Est. Amount</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {orders.length > 0 ? orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                                    <td className="px-6 py-4">{order.roDate}</td>
                                    <td className="px-6 py-4 font-mono text-orange-400">{order.regNo}</td>
                                    <td className="px-6 py-4">{order.customerName}</td>
                                    <td className="px-6 py-4">{order.vehicleModel}</td>
                                    <td className="px-6 py-4">{order.advisor}</td>
                                    <td className="px-6 py-4 text-right">Rp {order.estimatedAmt.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <OrderStatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-sm text-blue-400 hover:text-blue-300 hover:underline">View</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                        No repair orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RepairOrderSearch;
