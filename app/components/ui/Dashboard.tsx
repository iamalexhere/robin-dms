// app/components/ui/Dashboard.tsx
import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from '~/components/ui/Header';
import Sidebar from '~/components/ui/Side';
import Footer from '~/components/ui/Footer';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen" style={{ backgroundColor: '#323232ff' }}>
            {/* Header */}
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area - Sidebar dan Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#323232ff' }}>
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}