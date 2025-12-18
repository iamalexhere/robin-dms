import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
    className?: string;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    className = ''
}: PaginationProps) => {
    // Calculate range of items showing
    const startItem = (currentPage - 1) * (itemsPerPage || 10) + 1;
    const endItem = Math.min(currentPage * (itemsPerPage || 10), totalItems || 0);

    const getPageNumbers = () => {
        const pages = [];
        // Simple logic for now: show all if pages < 7, else show sparse
        // For this task, mock data is small, so showing all is fine, but let's make it robust-ish
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show 1, 2, ..., curr-1, curr, curr+1, ..., last
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 ${className}`}>
            {totalItems && (
                <div className="text-sm text-gray-400">
                    Showing <span className="font-medium text-white">{startItem}</span> to <span className="font-medium text-white">{endItem}</span> of <span className="font-medium text-white">{totalItems}</span> results
                </div>
            )}

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) => (
                        typeof page === 'number' ? (
                            <button
                                key={idx}
                                onClick={() => onPageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={idx} className="text-gray-500 px-1">...</span>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
