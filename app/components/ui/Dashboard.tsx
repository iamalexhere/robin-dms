// app/routes/dashboard.tsx
import { useState } from 'react';
import Header from '~/components/ui/Header';
import Sidebar from '~/components/ui/Side';
import Footer from '~/components/ui/Footer';

// Import semua konten
import DashboardContent from '~/components/ui/content/DashboardContent';
import UserManagement from '~/components/ui/content/UserManagement';
import ManufactureComponent from '~/components/ui/content/ManufacturComponent';
import ReportsContent from '~/components/ui/content/ReportsContent';
import MRNComponent from '~/components/ui/content/MRNComponent';
import MasterComponent from '~/components/ui/content/MasterComponent';
import SystemSettingsContent from '~/components/ui/content/SystemSettingsContent';
import Terms from '~/components/ui/content/TermsConditionsContent';

import { getUser } from '~/utils/auth';
import { checkPageAccess, type UserRole } from '~/utils/roleUtils';

export default function DashboardPage() {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Get current user role
    const user = getUser();
    const userRole = (user?.role || 'dealer_normal_user') as UserRole;

    // Function untuk render konten berdasarkan activeItem
    const renderContent = () => {
        // Check Access
        if (activeItem !== 'dashboard' && !checkPageAccess(activeItem, userRole)) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
                    <p>You do not have permission to view this page.</p>
                </div>
            );
        }

        switch (activeItem) {
            case 'dashboard':
                return <DashboardContent />;
            case 'user-management':
                return <UserManagement />;
            case 'manufacturer':
                return <ManufactureComponent />;
            case 'reports':
                return <ReportsContent />;
            case 'mrn':
                return <MRNComponent />;
            case 'masters':
                return <MasterComponent />;
            case 'system-settings':
                return <SystemSettingsContent />;
            case 'terms':
                return <Terms />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex flex-col h-screen" style={{ backgroundColor: '#323232ff' }}>
            {/* Header */}
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area - Sidebar dan Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    activeItem={activeItem}
                    onMenuClick={setActiveItem}
                    isOpen={sidebarOpen}
                />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#323232ff' }}>
                    {renderContent()}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}