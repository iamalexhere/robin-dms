export interface Report {
    id: string;
    category: string;
    name: string;
    desc: string;
    icon: string;
}

export interface ReportCategory {
    id: string;
    name: string;
    count: number;
}

export interface GeneratedReport {
    name: string;
    dateFrom: string;
    dateTo: string;
    format: string;
    generatedAt: string;
    status: string;
}

// ============================================
// DATA
// ============================================
export const REPORT_CATEGORIES: ReportCategory[] = [
    { id: 'all', name: 'All Reports', count: 45 },
    { id: 'sales', name: 'Sales', count: 8 },
    { id: 'service', name: 'Service', count: 12 },
    { id: 'parts', name: 'Parts & Inventory', count: 10 },
    { id: 'finance', name: 'Finance', count: 8 },
    { id: 'customer', name: 'Customer', count: 7 }
];

export const REPORTS_DATA: Report[] = [
    // Sales Reports
    { id: '1', category: 'sales', name: 'Daily Sales Summary', desc: 'Overview of daily sales transactions', icon: '📊' },
    { id: '2', category: 'sales', name: 'Vehicle Sales Report', desc: 'Detailed vehicle sales analysis', icon: '🚗' },
    { id: '3', category: 'sales', name: 'Sales Person Performance', desc: 'Individual sales performance tracking', icon: '👤' },
    { id: '4', category: 'sales', name: 'Monthly Sales Target vs Achievement', desc: 'Target comparison report', icon: '🎯' },
    { id: '5', category: 'sales', name: 'Test Drive Report', desc: 'Test drive activities and conversions', icon: '🔑' },
    { id: '6', category: 'sales', name: 'Lead Conversion Report', desc: 'Lead to customer conversion tracking', icon: '📈' },
    { id: '7', category: 'sales', name: 'Booking & Cancellation Report', desc: 'Vehicle booking status', icon: '📋' },
    { id: '8', category: 'sales', name: 'Delivery Report', desc: 'Vehicle delivery tracking', icon: '✅' },

    // Service Reports
    { id: '9', category: 'service', name: 'Daily Service Report', desc: 'Daily service operations summary', icon: '🔧' },
    { id: '10', category: 'service', name: 'Repair Order Status', desc: 'RO status and tracking', icon: '📝' },
    { id: '11', category: 'service', name: 'Service Advisor Performance', desc: 'Advisor productivity metrics', icon: '👨‍💼' },
    { id: '12', category: 'service', name: 'Workshop Utilization', desc: 'Bay and technician utilization', icon: '⚙️' },
    { id: '13', category: 'service', name: 'Customer Complaints', desc: 'Service complaints tracking', icon: '⚠️' },
    { id: '14', category: 'service', name: 'Service Revenue Report', desc: 'Service income analysis', icon: '💰' },
    { id: '15', category: 'service', name: 'Warranty Claims Report', desc: 'Warranty claims status', icon: '📄' },
    { id: '16', category: 'service', name: 'Parts Consumption (Service)', desc: 'Parts used in service jobs', icon: '🔩' },
    { id: '17', category: 'service', name: 'Service Package Sales', desc: 'Service package performance', icon: '📦' },
    { id: '18', category: 'service', name: 'Vehicle History Report', desc: 'Complete vehicle service history', icon: '📚' },
    { id: '19', category: 'service', name: 'Technician Performance', desc: 'Technician productivity tracking', icon: '👷' },
    { id: '20', category: 'service', name: 'Service Retention Report', desc: 'Customer retention metrics', icon: '🔄' },

    // Parts & Inventory Reports
    { id: '21', category: 'parts', name: 'Daily Parts Sales', desc: 'Daily parts sales summary', icon: '📊' },
    { id: '22', category: 'parts', name: 'Inventory Stock Report', desc: 'Current stock levels', icon: '📦' },
    { id: '23', category: 'parts', name: 'Fast Moving Parts', desc: 'High turnover parts analysis', icon: '⚡' },
    { id: '24', category: 'parts', name: 'Slow Moving Parts', desc: 'Low turnover inventory', icon: '🐌' },
    { id: '25', category: 'parts', name: 'Parts Shortage Report', desc: 'Out of stock items', icon: '❌' },
    { id: '26', category: 'parts', name: 'MRN Report', desc: 'Material Receipt Note tracking', icon: '📥' },
    { id: '27', category: 'parts', name: 'Parts Return Report', desc: 'Returned parts tracking', icon: '↩️' },
    { id: '28', category: 'parts', name: 'Dead Stock Report', desc: 'Non-moving inventory', icon: '💀' },
    { id: '29', category: 'parts', name: 'Parts Aging Report', desc: 'Inventory age analysis', icon: '⏰' },
    { id: '30', category: 'parts', name: 'Counter Sales Report', desc: 'Over-the-counter sales', icon: '🏪' },

    // Finance Reports
    { id: '31', category: 'finance', name: 'Daily Cash Collection', desc: 'Daily cash receipts', icon: '💵' },
    { id: '32', category: 'finance', name: 'Outstanding Receivables', desc: 'Pending customer payments', icon: '📑' },
    { id: '33', category: 'finance', name: 'Outstanding Payables', desc: 'Pending supplier payments', icon: '📋' },
    { id: '34', category: 'finance', name: 'GST/Tax Report', desc: 'Tax compliance report', icon: '🧾' },
    { id: '35', category: 'finance', name: 'Profit & Loss Statement', desc: 'P&L summary', icon: '📈' },
    { id: '36', category: 'finance', name: 'Credit Note Report', desc: 'Credit notes issued', icon: '📄' },
    { id: '37', category: 'finance', name: 'Payment Receipt Report', desc: 'Payment collection tracking', icon: '🧾' },
    { id: '38', category: 'finance', name: 'Financial Performance', desc: 'Overall financial metrics', icon: '💹' },

    // Customer Reports
    { id: '39', category: 'customer', name: 'New Customer Report', desc: 'New customer registrations', icon: '👥' },
    { id: '40', category: 'customer', name: 'Customer Database', desc: 'Complete customer list', icon: '📇' },
    { id: '41', category: 'customer', name: 'Customer Satisfaction Survey', desc: 'CSI scores and feedback', icon: '⭐' },
    { id: '42', category: 'customer', name: 'Customer Loyalty Report', desc: 'Repeat customer analysis', icon: '💝' },
    { id: '43', category: 'customer', name: 'Birthday & Anniversary', desc: 'Customer special dates', icon: '🎂' },
    { id: '44', category: 'customer', name: 'Service Due Report', desc: 'Upcoming service reminders', icon: '🔔' },
    { id: '45', category: 'customer', name: 'Lost Customer Report', desc: 'Customer attrition tracking', icon: '😞' }
];