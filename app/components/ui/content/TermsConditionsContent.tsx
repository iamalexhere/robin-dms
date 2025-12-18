import React, { useState } from 'react';
import { type TermsCondition, type ModalMode } from './type';
import termsData from '~/data/terms-data.json';
import { TermsIcon, FilterTabs, TermsCard, TermsModal, HistoryModal } from './componentsTC';

const { termsData: TERMS_DATA, historyData: HISTORY_DATA } = termsData as unknown as { termsData: TermsCondition[], historyData: any[] };

import { Input } from '~/components/ui/Input';

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
        <div className="p-6 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-white leading-none">Terms & Conditions</h2>
                        <TermsIcon />
                    </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto items-end">
                    <div className="relative flex-1 md:w-80">
                        <Input
                            variant="text"
                            placeholder="Search terms, document type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Create New
                    </button>
                </div>
            </div>

            {/* Navigation Tabs (Underline Style) */}
            <div className="flex gap-6 border-b border-gray-700 mb-6 overflow-x-auto flex-shrink-0">
                {[
                    { key: 'all', label: 'All Terms', count: termsData.length },
                    { key: 'manufacturer', label: 'Manufacturer', count: manufacturerCount },
                    { key: 'dealer', label: 'Dealer Branch', count: dealerCount },
                    { key: 'revised', label: 'Revised', count: revisedCount },
                    { key: 'history', label: 'History', count: HISTORY_DATA.length }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setActiveView(tab.key as any);
                            setFilterType('all');
                        }}
                        className={`pb-2 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${activeView === tab.key
                            ? 'text-orange-500'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab.label} <span className="ml-1 text-xs opacity-70">({tab.count})</span>
                        {activeView === tab.key && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />}
                    </button>
                ))}
            </div>

            {/* Statistics Cards (Compact) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 flex-shrink-0">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-orange-400 text-xs font-medium uppercase tracking-wider mb-1">Total Active</p>
                    <p className="text-2xl font-bold text-white">{activeCount}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-blue-400 text-xs font-medium uppercase tracking-wider mb-1">Manufacturer</p>
                    <p className="text-2xl font-bold text-white">{manufacturerCount}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-purple-400 text-xs font-medium uppercase tracking-wider mb-1">Dealer Branch</p>
                    <p className="text-2xl font-bold text-white">{dealerCount}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-yellow-400 text-xs font-medium uppercase tracking-wider mb-1">Revised</p>
                    <p className="text-2xl font-bold text-white">{revisedCount}</p>
                </div>
            </div>

            {/* Content based on active view */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {activeView === 'history' ? (
                    // History View
                    <div className="space-y-3">
                        <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#1f1f1f] py-2 z-10">
                            <h3 className="text-lg font-bold text-white">Change Log</h3>
                            <button onClick={() => setActiveView('all')} className="text-sm text-blue-400 hover:text-blue-300">Back to List</button>
                        </div>

                        {HISTORY_DATA.map((item) => {
                            const relatedTerm = termsData.find(t => t.id === item.termsId);
                            return (
                                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-orange-500 font-mono font-bold">{item.version}</span>
                                            {relatedTerm && (
                                                <span className="text-white font-medium">• {relatedTerm.documentType}</span>
                                            )}
                                            {item.previousVersion && (
                                                <span className="text-gray-500 text-sm">← {item.previousVersion}</span>
                                            )}
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${item.action === 'created' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                                                item.action === 'updated' ? 'bg-blue-900/50 text-blue-400 border border-blue-800' :
                                                    item.action === 'activated' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800' :
                                                        'bg-red-900/50 text-red-400 border border-red-800'
                                                }`}>
                                                {item.action}
                                            </span>
                                        </div>
                                        <span className="text-gray-500 text-xs whitespace-nowrap ml-2">{item.date}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-2">{item.changes}</p>
                                    <p className="text-gray-600 text-xs">By {item.user}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Terms List View
                    <>
                        {activeView === 'all' && (
                            <div className="mb-4">
                                <FilterTabs selected={filterType} onSelect={setFilterType} />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                            {filteredTerms.length > 0 ? (
                                filteredTerms.map(term => (
                                    <TermsCard
                                        key={term.id}
                                        term={term}
                                        onView={() => handleView(term)}
                                        onEdit={() => handleEdit(term)}
                                        onToggleActive={() => handleToggleActive(term.id)}
                                        onViewHistory={() => handleViewHistory(term)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-gray-300 text-lg">No terms found</p>
                                    <p className="text-gray-500 text-sm">Try adjusting filters</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

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