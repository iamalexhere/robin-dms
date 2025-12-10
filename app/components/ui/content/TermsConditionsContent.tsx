import React, { useState } from 'react';
import { type TermsCondition, type ModalMode } from './type';
import termsData from '~/data/terms-data.json';
import { TermsIcon, FilterTabs, TermsCard, TermsModal, HistoryModal } from './componentsTC';

const { termsData: TERMS_DATA, historyData: HISTORY_DATA } = termsData as unknown as { termsData: TermsCondition[], historyData: any[] };

import Search from '~/components/ui/Search';

const TermsConditionsContent = () => {
    const [activeView, setActiveView] = useState<'all' | 'manufacturer' | 'dealer' | 'revised' | 'history'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [termsData, setTermsData] = useState(TERMS_DATA);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('view');
    const [selectedTerm, setSelectedTerm] = useState<TermsCondition | null>(null);
    const [showHistory, setShowHistory] = useState(false);

    // Filter berdasarkan activeView dan search
    const getFilteredTerms = () => {
        let filtered = termsData;

        // Filter by view type
        if (activeView === 'manufacturer') {
            filtered = filtered.filter(t => t.type === 'manufacturer');
        } else if (activeView === 'dealer') {
            filtered = filtered.filter(t => t.type === 'dealer');
        } else if (activeView === 'revised') {
            filtered = filtered.filter(t => t.type === 'revised');
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(term =>
                term.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                term.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                term.version.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Additional filter by type tabs (for 'all' view)
        if (activeView === 'all' && filterType !== 'all') {
            filtered = filtered.filter(t => t.type === filterType);
        }

        return filtered;
    };

    const filteredTerms = getFilteredTerms();

    const handleView = (term: TermsCondition) => {
        setSelectedTerm(term);
        setModalMode('view');
        setShowModal(true);
    };

    const handleEdit = (term: TermsCondition) => {
        setSelectedTerm(term);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedTerm(null);
        setModalMode('create');
        setShowModal(true);
    };

    const handleViewHistory = (term: TermsCondition) => {
        setSelectedTerm(term);
        setShowHistory(true);
    };

    const handleToggleActive = (id: string) => {
        setTermsData(termsData.map(term =>
            term.id === id ? { ...term, isActive: !term.isActive } : term
        ));
    };

    const handleSave = (data: any) => {
        if (modalMode === 'create') {
            const newTerm: TermsCondition = {
                ...data,
                id: String(termsData.length + 1),
                createdBy: 'Current User',
                createdDate: new Date().toISOString().split('T')[0],
                lastModified: new Date().toISOString().split('T')[0],
            };
            setTermsData([...termsData, newTerm]);
        } else if (modalMode === 'edit' && selectedTerm) {
            setTermsData(termsData.map(term =>
                term.id === selectedTerm.id ? { ...term, ...data, lastModified: new Date().toISOString().split('T')[0] } : term
            ));
        }
    };

    // Statistics
    const activeCount = termsData.filter(t => t.isActive).length;
    const manufacturerCount = termsData.filter(t => t.type === 'manufacturer').length;
    const dealerCount = termsData.filter(t => t.type === 'dealer').length;
    const revisedCount = termsData.filter(t => t.type === 'revised').length;

    // Get history for selected term
    const termHistory = selectedTerm ? HISTORY_DATA.filter(h => h.termsId === selectedTerm.id) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-white">Terms & Conditions Management</h2>
                        <TermsIcon />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Create New T&C
                    </button>
                </div>
                <p className="text-gray-400">Manage terms and conditions for dealer branch and manufacturer documents</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                    { key: 'all', label: 'All Terms & Conditions', count: termsData.length },
                    { key: 'manufacturer', label: 'Manufacturer T&C', count: manufacturerCount },
                    { key: 'dealer', label: 'Dealer Branch T&C', count: dealerCount },
                    { key: 'revised', label: 'Revised T&C', count: revisedCount },
                    { key: 'history', label: 'T&C History', count: HISTORY_DATA.length }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setActiveView(tab.key as any);
                            setFilterType('all');
                        }}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeView === tab.key
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                    <p className="text-orange-400 text-sm font-medium mb-2">Total Active T&C</p>
                    <p className="text-3xl font-bold text-white">{activeCount}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                    <p className="text-blue-400 text-sm font-medium mb-2">Manufacturer T&C</p>
                    <p className="text-3xl font-bold text-white">{manufacturerCount}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                    <p className="text-purple-400 text-sm font-medium mb-2">Dealer Branch T&C</p>
                    <p className="text-3xl font-bold text-white">{dealerCount}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                    <p className="text-yellow-400 text-sm font-medium mb-2">Revised T&C</p>
                    <p className="text-3xl font-bold text-white">{revisedCount}</p>
                </div>
            </div>

            {/* Content based on active view */}
            {activeView === 'history' ? (
                // History View
                <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Complete Change History</h3>
                        <p className="text-gray-400 text-sm">Total changes: {HISTORY_DATA.length}</p>
                    </div>

                    {HISTORY_DATA.map((item) => {
                        const relatedTerm = termsData.find(t => t.id === item.termsId);
                        return (
                            <div key={item.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-orange-500 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-orange-500 font-semibold">{item.version}</span>
                                        {relatedTerm && (
                                            <span className="text-white font-medium">• {relatedTerm.documentType}</span>
                                        )}
                                        {item.previousVersion && (
                                            <span className="text-gray-500 text-sm">← from {item.previousVersion}</span>
                                        )}
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.action === 'created' ? 'bg-green-600 text-white' :
                                            item.action === 'updated' ? 'bg-blue-600 text-white' :
                                                item.action === 'activated' ? 'bg-emerald-600 text-white' :
                                                    'bg-red-600 text-white'
                                            }`}>
                                            {item.action.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-sm whitespace-nowrap ml-2">{item.date}</span>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{item.changes}</p>
                                <p className="text-gray-500 text-xs">Modified by: {item.user}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Terms List View
                <>
                    <Search
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search terms & conditions..."
                        className="mb-6"
                    />

                    {activeView === 'all' && <FilterTabs selected={filterType} onSelect={setFilterType} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTerms.map(term => (
                            <TermsCard
                                key={term.id}
                                term={term}
                                onView={() => handleView(term)}
                                onEdit={() => handleEdit(term)}
                                onToggleActive={() => handleToggleActive(term.id)}
                                onViewHistory={() => handleViewHistory(term)}
                            />
                        ))}
                    </div>

                    {filteredTerms.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <p className="text-gray-400 text-lg mb-2">No terms & conditions found</p>
                            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                        </div>
                    )}
                </>
            )}

            {/* Modals */}
            {showModal && (
                <TermsModal
                    term={selectedTerm}
                    mode={modalMode}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}

            {showHistory && selectedTerm && (
                <HistoryModal
                    term={selectedTerm}
                    historyItems={termHistory}
                    onClose={() => setShowHistory(false)}
                />
            )}
        </div>
    );
};

export default TermsConditionsContent;