import { useState } from "react";

import Sidebar from "~/components/ui/Side";
import Header from "~/components/ui/Header";
import Footer from "~/components/ui/Footer";

// Import semua konten halaman
import DashboardContent from "~/components/ui/content/DashboardContent";
import UserManagement from "~/components/ui/content/UserManagement";
import ManufactureComponent from "~/components/ui/content/ManufacturComponent";
import ReportsContent from "~/components/ui/content/ReportsContent";
import MasterComponent from "~/components/ui/content/MasterComponent";
import TermsConditionsContent from "~/components/ui/content/TermsConditionsContent";
import SystemSettingsContent from "~/components/ui/content/SystemSettingsContent";

export default function Dashboard() {

    // menerima menu yang dikirim dari Sidebar
    const [activeMenu, setActiveMenu] = useState("dashboard");

    // untuk buka-tutup sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const renderContent = () => {
        switch (activeMenu) {
            case "dashboard":
                return <DashboardContent />;

            case "user-management":   // <-- dari Sidebar.id
                return <UserManagement />;

            case "manufacturer":
                return <ManufactureComponent />;

            case "reports":
                return <ReportsContent />;

            case "masters":
                return <MasterComponent />;

            case "system-settings":
                return <SystemSettingsContent />;

            case "terms":
                return <TermsConditionsContent />;

            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-900">

            {/* SIDEBAR */}
            <Sidebar
                activeItem={activeMenu}
                onMenuClick={setActiveMenu}
                isOpen={isSidebarOpen}
            />

            {/* MAIN AREA */}
            <div className="flex flex-col flex-1">

                {/* HEADER */}
                <Header />

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-6">
                    {renderContent()}
                </main>

                {/* FOOTER */}
                <Footer />
            </div>
        </div>
    );
}
