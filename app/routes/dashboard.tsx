import { Button } from "~/components/ui/Button";

export default function Dashboard() {
    const handleLogout = () => {
        // Menghapus token data auth dari localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Redirect ke halaman login
        window.location.href = '/login';
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
                <p className="text-gray-400 mb-6">You have successfully logged in!</p>

                <Button
                    variant="primary"
                    size="md"
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
            </div>
        </div>
    );
}