import AccountNotification from "./Profile";

interface HeaderProps {
    onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b bg-black border-white/10">
            {/* Left Side: Hamburger + Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuToggle}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <img
                    src="/image/base_logo@1.png"
                    alt="ROBIN Logo"
                    className="h-8 w-auto"
                />
            </div>

            {/* Right Side: Notification + User */}
            <AccountNotification />
        </header>
    );
}