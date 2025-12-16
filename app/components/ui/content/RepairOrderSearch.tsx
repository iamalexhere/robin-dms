import React, { useState } from 'react';
import { Button } from '~/components/ui/Button';
import Pagination from '~/components/ui/Pagination';

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

// Mock Data - Expanded for Pagination Demo
const MOCK_ORDERS: RepairOrder[] = [
    { id: 'RO-2025-1001', roDate: '2025-12-01', regNo: 'KA-01-AB-1234', chassisNo: 'MZ1234567890', customerName: 'Rajesh Kumar', vehicleModel: 'XUV 700', status: 'WIP', advisor: 'Amit Singh', estimatedAmt: 8500 },
    { id: 'RO-2025-1002', roDate: '2025-12-02', regNo: 'KA-05-XY-9876', chassisNo: 'MZ0987654321', customerName: 'Sneha Gupta', vehicleModel: 'Thar', status: 'Completed', advisor: 'John D', estimatedAmt: 12000 },
    { id: 'RO-2025-1003', roDate: '2025-12-03', regNo: 'KA-51-MM-5555', chassisNo: 'MZ1122334455', customerName: 'Arun Verma', vehicleModel: 'Scorpio N', status: 'Delivered', advisor: 'Amit Singh', estimatedAmt: 5400 },
    { id: 'RO-2025-1004', roDate: '2025-12-04', regNo: 'KA-03-ZZ-1111', chassisNo: 'MZ9988776655', customerName: 'Priya Mehta', vehicleModel: 'XUV 300', status: 'Open', advisor: 'Sarah Khan', estimatedAmt: 3500 },
    { id: 'RO-2025-1005', roDate: '2025-12-05', regNo: 'MH-12-PQ-2222', chassisNo: 'MZ5544332211', customerName: 'Vikram Singh', vehicleModel: 'Bolero', status: 'Invoiced', advisor: 'John D', estimatedAmt: 15000 },
    { id: 'RO-2025-1006', roDate: '2025-12-06', regNo: 'DL-01-CA-3333', chassisNo: 'MZ6677889900', customerName: 'Anil Kapoor', vehicleModel: 'XUV 700', status: 'Open', advisor: 'Sarah Khan', estimatedAmt: 4200 },
    { id: 'RO-2025-1007', roDate: '2025-12-06', regNo: 'HR-26-DK-4444', chassisNo: 'MZ1122339988', customerName: 'Sunil Shetty', vehicleModel: 'Thar', status: 'WIP', advisor: 'Amit Singh', estimatedAmt: 9800 },
    { id: 'RO-2025-1008', roDate: '2025-12-07', regNo: 'UP-14-EF-5555', chassisNo: 'MZ4455667788', customerName: 'Akshay Kumar', vehicleModel: 'Scorpio Classic', status: 'Completed', advisor: 'John D', estimatedAmt: 6500 },
    { id: 'RO-2025-1009', roDate: '2025-12-08', regNo: 'TN-09-GH-6666', chassisNo: 'MZ9988001122', customerName: 'Rajinikanth', vehicleModel: 'XUV 300', status: 'Delivered', advisor: 'Sarah Khan', estimatedAmt: 21000 },
    { id: 'RO-2025-1010', roDate: '2025-12-08', regNo: 'KA-04-IJ-7777', chassisNo: 'MZ3322110099', customerName: 'Kamal Haasan', vehicleModel: 'XUV 700', status: 'Invoiced', advisor: 'Amit Singh', estimatedAmt: 18000 },
    { id: 'RO-2025-1011', roDate: '2025-12-09', regNo: 'KL-07-KL-8888', chassisNo: 'MZ7766554433', customerName: 'Mohanlal', vehicleModel: 'Bolero Neo', status: 'Open', advisor: 'John D', estimatedAmt: 5000 },
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

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
        setCurrentPage(1); // Reset to first page on search
    };

    const handleReset = () => {
        setSearchQuery('');
        setDateFrom('');
        setDateTo('');
        setStatusFilter('All');
        setOrders(MOCK_ORDERS);
        setCurrentPage(1);
    };

    // Pagination Logic
    const totalItems = orders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-6 min-h-full flex flex-col">
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
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">From Date</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">To Date</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
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

            {/* Results Table - Removed flex-1 min-h-0 to allow natural height growth */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex flex-col">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/80 backdrop-blur">
                    <h3 className="text-lg font-bold text-white">Search Results</h3>
                    <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">{orders.length} orders found</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300 border-separate border-spacing-0">
                        <thead className="text-xs uppercase bg-gray-900/90 text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">RO Number</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Reg No.</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Customer</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Vehicle</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Advisor</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700 text-right">Est. Amount</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700 text-center">Status</th>
                                <th className="px-6 py-4 font-semibold tracking-wider border-b border-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {currentOrders.length > 0 ? currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.roDate}</td>
                                    <td className="px-6 py-4 font-mono text-orange-400 font-medium whitespace-nowrap">{order.regNo}</td>
                                    <td className="px-6 py-4 font-medium text-gray-200">{order.customerName}</td>
                                    <td className="px-6 py-4">{order.vehicleModel}</td>
                                    <td className="px-6 py-4 text-sm">{order.advisor}</td>
                                    <td className="px-6 py-4 text-right font-medium text-white">Rp {order.estimatedAmt.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <OrderStatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all text-xs font-semibold">View</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-16 text-center text-gray-500 flex flex-col items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <p className="text-lg font-medium text-gray-400">No repair orders found</p>
                                        <p className="text-sm">Try adjusting your search criteria</p>
                                    </td>
                                </tr>
                            )}
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
};

export default RepairOrderSearch;
