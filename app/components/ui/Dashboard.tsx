import { useState } from 'react';
import Header from './Header';
import Sidebar from './Side';
import Footer from './Footer';

interface DashboardProps {
    children?: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                    {children || (
                        <div className="p-4 pt-3">
                            <h1 className="text-3xl font-bold text-white mb-4">
                                {activeItem.charAt(0).toUpperCase() + activeItem.slice(1).replace('-', ' ')}
                            </h1>
                            <p className="text-gray-400">
                                Content untuk {activeItem} akan ditampilkan di sini.
                            </p>
                        </div>
                    )}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}