import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { getUser } from '~/utils/auth';
import { checkPageAccess, type UserRole } from '~/utils/roleUtils';

// Search Component
interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

interface MenuItem {
    id: string;
    label: string;
    to?: string;
    end?: boolean;
    icon?: React.ReactNode;
    subItems?: { id: string; label: string; to: string }[];
}

function Search({ value, onChange, placeholder = "Search...", className = "" }: SearchProps) {
    return (
        <div
            className={`flex items-center gap-3 bg-black/20 px-4 py-2 rounded-lg shadow-sm border border-white/10 ${className}`}
        >
            {/* Icon Search */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>

            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none text-white placeholder-white/50"
            />
        </div>
    );
}

// Sidebar Component
interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    // Load favorites from local storage on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('robin_dms_favorites');
        if (savedFavorites) {
            setFavoriteIds(JSON.parse(savedFavorites));
        }
    }, []);

    // Save favorites to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('robin_dms_favorites', JSON.stringify(favoriteIds));
    }, [favoriteIds]);

    // Get current user role
    const user = getUser();
    const userRole = (user?.role || 'dealer_normal_user') as UserRole;

    const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFavoriteIds(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const allMenuItems: MenuItem[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            to: '/dashboard',

            end: true,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
            )
        },
        {
            id: 'manufacturer',
            label: 'Manufacturer Hierarchy',
            to: '/manufacturer',

            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            id: 'customer',
            label: 'Customer Master',
            to: '/customer',

            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            id: 'repair-orders',
            label: 'Repair Order Search',
            to: '/repair-orders',

            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            )
        },

        {
            id: 'mrn',
            label: 'Material Receipt',
            to: '/mrn',

            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            id: 'terms',
            label: 'Terms & Conditions',
            to: '/terms',

            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    // Build the Favorite Menu Item dynamically
    const favoriteSubItems = allMenuItems
        .filter(item => favoriteIds.includes(item.id))
        .map(item => ({
            id: item.id,
            label: item.label,
            to: item.to || '#',
        }));

    const completeMenuItems: MenuItem[] = [
        {
            id: 'favorite',
            label: 'Favorite',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ),
            // Use the dynamically generated subItems
            subItems: favoriteSubItems.length > 0 ? favoriteSubItems : [{ id: 'empty', label: 'No favorites yet', to: '#' }]
        },
        ...allMenuItems
    ];

    const filteredMenuItems = completeMenuItems
        .filter(item => item.id === 'favorite' || checkPageAccess(item.id, userRole))
        .filter(item => {
            if (!searchQuery) return true;
            const matchLabel = item.label.toLowerCase().includes(searchQuery.toLowerCase());
            // Safe access subItems with optional chaining
            const matchSubItems = item.subItems?.some(sub => sub.label.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchLabel || matchSubItems;
        });

    const toggleExpand = (itemId: string) => {
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const StarButton = ({ itemId, isFavorite }: { itemId: string, isFavorite: boolean }) => (
        <button
            onClick={(e) => toggleFavorite(itemId, e)}
            className={`p-1 hover:bg-white/20 rounded-full transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}
            title={isFavorite ? "Remove from favorite" : "Add to favorite"}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </button>
    );

    return (
        <div
            className={`flex flex-col text-white transition-all duration-300 ${isOpen ? 'w-60' : 'w-0'
                } overflow-hidden`}
            style={{ backgroundColor: '#8B2332' }}
        >
            {/* Search */}
            <div className="px-4 py-3">
                <Search
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Find something..."
                />
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                    nav::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {filteredMenuItems.map((item) => (
                    <div key={item.id}>
                        {item.subItems ? (
                            <button
                                onClick={() => toggleExpand(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors border-b border-white/10 text-white hover:bg-white/10`}
                            >
                                {item.icon}
                                <span className="flex-1 text-left text-sm">{item.label}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 transition-transform ${expandedItems.includes(item.id) ? 'rotate-180' : ''
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        ) : (
                            <NavLink
                                to={item.to || "#"}
                                end={item.end}
                                className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 transition-colors border-b border-white/10 group ${isActive ? 'bg-[#DC143C] text-white' : 'text-white hover:bg-white/10'}`}
                            >
                                {item.icon}
                                <span className="flex-1 text-left text-sm">{item.label}</span>
                                {/* Add Star button here, but ignore it for the 'favorite' folder itself if needed.
                                    Actually the favorite folder is a subItems type, so it uses the upper block.
                                    This block is for individual items. */}
                                {item.id !== 'favorite' && (
                                    <StarButton itemId={item.id} isFavorite={favoriteIds.includes(item.id)} />
                                )}
                            </NavLink>
                        )}

                        {item.subItems && expandedItems.includes(item.id) && (
                            <div className="bg-black/20">
                                {item.subItems.map((subItem) => (
                                    <NavLink
                                        key={subItem.id}
                                        to={subItem.to}
                                        className={({ isActive }) => `block w-full text-left px-12 py-2 text-sm transition-colors ${isActive ? 'bg-[#DC143C] text-white' : 'text-white hover:bg-white/10'}`}
                                    >
                                        {subItem.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
}