import React, { useState } from 'react';
import { type TermsCondition, type ModalMode, type HistoryItem, DOCUMENT_TYPES } from './type';

// Icons
export const TermsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

// Filter Tabs
export const FilterTabs = ({ selected, onSelect }: { selected: string; onSelect: (val: string) => void }) => (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'manufacturer', 'dealer', 'revised'].map(type => (
            <button
                key={type}
                onClick={() => onSelect(type)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selected === type
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
            >
                {type === 'all' ? 'All T&C' : type === 'manufacturer' ? 'Manufacturer' : type === 'dealer' ? 'Dealer Branch' : 'Revised'}
            </button>
        ))}
    </div>
);

// Terms Card
export const TermsCard = ({ term, onView, onEdit, onToggleActive, onViewHistory }: {
    term: TermsCondition;
    onView: () => void;
    onEdit: () => void;
    onToggleActive: () => void;
    onViewHistory: () => void;
}) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-all h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
            <h3 className="text-white font-semibold text-lg flex-1 pr-2">{term.documentType}</h3>
            <button
                onClick={onToggleActive}
                className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${term.isActive
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
            >
                {term.isActive ? 'Active' : 'Inactive'}
            </button>
        </div>

        <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${term.type === 'manufacturer' ? 'bg-blue-500 text-white' :
                term.type === 'dealer' ? 'bg-purple-500 text-white' :
                    'bg-yellow-500 text-white'
                }`}>
                {term.type === 'manufacturer' ? 'Manufacturer' : term.type === 'dealer' ? 'Dealer Branch' : 'Revised'}
            </span>
        </div>

        <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">Version: {term.version}</p>
            <p className="text-gray-500 text-xs">Last Modified: {term.lastModified}</p>
        </div>

        <div className="mb-4 flex-1">
            <p className="text-gray-400 text-sm mb-2">Applicable For:</p>
            <div className="flex flex-wrap gap-2">
                {term.applicableFor.map((doc, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {doc}
                    </span>
                ))}
            </div>
        </div>

        <div className="flex gap-2 mt-auto">
            <button
                onClick={onView}
                className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg transition-colors font-medium"
            >
                View
            </button>
            <button
                onClick={onEdit}
                className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors font-medium"
            >
                Edit
            </button>
            <button
                onClick={onViewHistory}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors font-medium"
                title="View History"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </button>
        </div>
    </div>
);

// View/Edit Modal
export const TermsModal = ({
    term,
    mode,
    onClose,
    onSave
}: {
    term: TermsCondition | null;
    mode: ModalMode;
    onClose: () => void;
    onSave: (data: any) => void;
}) => {
    const [formData, setFormData] = useState(term || {
        type: 'dealer',
        documentType: '',
        version: 'v1.0',
        content: '',
        isActive: true,
        applicableFor: []
    });

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!term && mode === 'view') return null;

    const isReadOnly = mode === 'view';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-4xl w-full border border-gray-700 max-h-screen overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {mode === 'create' ? 'Create New T&C' : mode === 'edit' ? 'Edit T&C' : 'View T&C'}
                        </h3>
                        {term && (
                            <p className="text-gray-400 text-sm">
                                Created by {term.createdBy} on {term.createdDate}
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm font-medium">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                            disabled={isReadOnly}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                        >
                            <option value="manufacturer">Manufacturer</option>
                            <option value="dealer">Dealer Branch</option>
                            <option value="revised">Revised</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm font-medium">Document Type</label>
                        <select
                            value={formData.documentType}
                            onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                            disabled={isReadOnly}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                        >
                            <option value="">Select Document Type</option>
                            {DOCUMENT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm font-medium">Version</label>
                        <input
                            type="text"
                            value={formData.version}
                            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                            disabled={isReadOnly}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                            placeholder="e.g., v1.0"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm font-medium">Applicable For (Select Multiple)</label>
                        <div className="bg-gray-700 rounded-lg p-3 max-h-40 overflow-y-auto">
                            {DOCUMENT_TYPES.map(type => (
                                <label key={type} className="flex items-center gap-2 mb-2 text-gray-300 cursor-pointer hover:text-white">
                                    <input
                                        type="checkbox"
                                        checked={formData.applicableFor?.includes(type)}
                                        onChange={(e) => {
                                            const newApplicable = e.target.checked
                                                ? [...(formData.applicableFor || []), type]
                                                : (formData.applicableFor || []).filter(t => t !== type);
                                            setFormData({ ...formData, applicableFor: newApplicable });
                                        }}
                                        disabled={isReadOnly}
                                        className="w-4 h-4"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm font-medium">Terms & Conditions Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            disabled={isReadOnly}
                            rows={10}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 disabled:opacity-50 font-mono text-sm"
                            placeholder="Enter terms and conditions content here..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            disabled={isReadOnly}
                            className="w-5 h-5"
                        />
                        <label htmlFor="isActive" className="text-gray-300 font-medium">Active (Will be printed on documents)</label>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    {!isReadOnly && (
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
                        >
                            {mode === 'create' ? 'Create T&C' : 'Save Changes'}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        {isReadOnly ? 'Close' : 'Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// History Modal
export const HistoryModal = ({
    term,
    historyItems,
    onClose
}: {
    term: TermsCondition;
    historyItems: HistoryItem[];
    onClose: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-3xl w-full border border-gray-700 max-h-screen overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Version History</h3>
                        <p className="text-gray-400 text-sm">{term.documentType} - Current Version: {term.version}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                <div className="space-y-3">
                    {historyItems.length === 0 ? (
                        <div className="text-center py-8">
                            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-gray-400">No history available for this T&C</p>
                        </div>
                    ) : (
                        historyItems.map((item) => (
                            <div key={item.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-orange-500 font-semibold">{item.version}</span>
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
                                    <span className="text-gray-400 text-sm">{item.date}</span>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{item.changes}</p>
                                <p className="text-gray-500 text-xs">Modified by: {item.user}</p>
                            </div>
                        ))
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};