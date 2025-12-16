import React, { useState } from 'react';
import { type Report, type ReportCategory, type GeneratedReport } from './type-and-data';
import reportsData from '~/data/reports.json';
const { categories: REPORT_CATEGORIES, reports: REPORTS_DATA } = reportsData;

import { downloadPDF, downloadExcel, downloadCSV } from './donwload-utils';
import Search from '~/components/ui/Search';


const ReportIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
    <div className="mb-6">
        <Search
            placeholder="Search reports..."
            value={value}
            onChange={onChange}
        />
    </div>
);

const CategoryTabs = ({ categories, selected, onSelect }: {
    categories: ReportCategory[];
    selected: string;
    onSelect: (id: string) => void
}) => (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
            <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selected === cat.id ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
                {cat.name} <span className="text-sm opacity-70">({cat.count})</span>
            </button>
        ))}
    </div>
);

const ReportCard = ({ report, onGenerate }: { report: Report; onGenerate: (rep: Report) => void }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-orange-500 transition-all cursor-pointer hover:shadow-lg">
        <div className="flex items-start gap-3">
            <span className="text-3xl">{report.icon}</span>
            <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{report.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{report.desc}</p>
                <button
                    onClick={() => onGenerate(report)}
                    className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
                >
                    Generate
                </button>
            </div>
        </div>
    </div>
);

const GenerateModal = ({
    report,
    dateFrom,
    dateTo,
    format,
    isGenerating,
    generatedReport,
    onDateFromChange,
    onDateToChange,
    onFormatChange,
    onGenerate,
    onDownload,
    onClose
}: {
    report: Report;
    dateFrom: string;
    dateTo: string;
    format: string;
    isGenerating: boolean;
    generatedReport: GeneratedReport | null;
    onDateFromChange: (val: string) => void;
    onDateToChange: (val: string) => void;
    onFormatChange: (val: string) => void;
    onGenerate: () => void;
    onDownload: () => void;
    onClose: () => void;
}) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-gray-700 max-h-screen overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">{report.icon}</span>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{report.name}</h3>
                        <p className="text-gray-400 text-sm">{report.desc}</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>

            {!generatedReport ? (
                <>
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">From Date</label>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => onDateFromChange(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">To Date</label>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => onDateToChange(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm font-medium">Format</label>
                            <select
                                value={format}
                                onChange={(e) => onFormatChange(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500"
                            >
                                <option value="PDF">PDF (Print)</option>
                                <option value="Excel">Excel (CSV)</option>
                                <option value="CSV">CSV</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onGenerate}
                            disabled={isGenerating || !dateFrom || !dateTo}
                            className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Generating...
                                </>
                            ) : 'Generate Report'}
                        </button>
                        <button onClick={onClose} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors">Cancel</button>
                    </div>
                </>
            ) : (
                <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 bg-opacity-20 rounded-full mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Report Generated Successfully!</h4>
                    <p className="text-gray-400 mb-6">
                        Your report is ready to download
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-400">Report Name</p>
                                <p className="text-white font-medium">{generatedReport.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Format</p>
                                <p className="text-white font-medium">{generatedReport.format}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Date Range</p>
                                <p className="text-white font-medium">{dateFrom} to {dateTo}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Generated At</p>
                                <p className="text-white font-medium">{generatedReport.generatedAt}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onDownload} className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            Download Report
                        </button>
                        <button onClick={onClose} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors">Close</button>
                    </div>
                </div>
            )}
        </div>
    </div>
);

const ReportsContent = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['all']); // Expand 'all' or specific ids
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [format, setFormat] = useState<string>('PDF');

    const toggleCategory = (catId: string) => {
        setExpandedCategories(prev =>
            prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
        );
    };

    const handleGenerateClick = (report: Report) => {
        setSelectedReport(report);
        setShowModal(true);
        setGeneratedReport(null);
        const today = new Date().toISOString().split('T')[0];
        setDateTo(today);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        setDateFrom(monthAgo.toISOString().split('T')[0]);
    };

    const handleGenerate = () => {
        if (!selectedReport) return;
        setIsGenerating(true);
        setTimeout(() => {
            setGeneratedReport({
                name: selectedReport.name,
                dateFrom,
                dateTo,
                format,
                generatedAt: new Date().toLocaleString(),
                status: 'Ready'
            });
            setIsGenerating(false);
        }, 2000);
    };

    const handleDownload = () => {
        if (!selectedReport) return;
        try {
            if (format === 'PDF') {
                downloadPDF(selectedReport, dateFrom, dateTo);
            } else if (format === 'Excel') {
                downloadExcel(selectedReport, dateFrom, dateTo);
            } else if (format === 'CSV') {
                downloadCSV(selectedReport, dateFrom, dateTo);
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Error generating file. Please try again.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedReport(null);
        setGeneratedReport(null);
        setIsGenerating(false);
    };

    // Filter reports based on search
    const filteredReports = REPORTS_DATA.filter(report =>
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group reports by category
    const reportsByCategory = REPORT_CATEGORIES
        .filter(cat => cat.id !== 'all') // Process real categories
        .map(cat => ({
            ...cat,
            reports: filteredReports.filter(r => r.category === cat.id)
        }))
        .filter(group => group.reports.length > 0); // Hide empty groups (e.g. if search filters them out)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-white">Reports</h2>
                    <ReportIcon />
                </div>
                <p className="text-gray-400">Generate and view system reports</p>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="space-y-4 max-w-4xl">
                {reportsByCategory.length > 0 ? (
                    reportsByCategory.map(category => (
                        <div key={category.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-bold text-orange-400">{category.name}</span>
                                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                                        {category.reports.length}
                                    </span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategories.includes(category.id) ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Accordion Content */}
                            {expandedCategories.includes(category.id) && (
                                <div className="border-t border-gray-700 divide-y divide-gray-700">
                                    {category.reports.map(report => (
                                        <div key={report.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl p-2 bg-gray-700/50 rounded-lg">{report.icon}</span>
                                                <div>
                                                    <h4 className="text-white font-medium">{report.name}</h4>
                                                    <p className="text-sm text-gray-400">{report.desc}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleGenerateClick(report)}
                                                className="px-4 py-2 bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-medium transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
                        <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-400 text-lg">No reports found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>

            {showModal && selectedReport && (
                <GenerateModal
                    report={selectedReport}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    format={format}
                    isGenerating={isGenerating}
                    generatedReport={generatedReport}
                    onDateFromChange={setDateFrom}
                    onDateToChange={setDateTo}
                    onFormatChange={setFormat}
                    onGenerate={handleGenerate}
                    onDownload={handleDownload}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ReportsContent;