import Dashboard from "~/components/ui/Dashboard";
import ProtectedRoute from "~/components/ProtectedRoute";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    );
}
