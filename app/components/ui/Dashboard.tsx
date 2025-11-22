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
import MasterComponent from '~/components/ui/content/MasterComponent';
import SystemSettingsContent from '~/components/ui/content/SystemSettingsContent';
import Terms from '~/components/ui/content/TermsConditionsContent';

export default function DashboardPage() {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Function untuk render konten berdasarkan activeItem
    const renderContent = () => {
        switch (activeItem) {
            case 'dashboard':
                return <DashboardContent />;
            case 'user-management':
                return <UserManagement />;
            case 'manufacturer':
                return <ManufactureComponent />;
            case 'reports':
                return <ReportsContent />;
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