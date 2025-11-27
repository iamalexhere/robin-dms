import React, { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import Filter from "../Filter";

export default function ReportContent() {
    const [reportType, setReportType] = useState("sales");
    const [dateFrom, setDateFrom] = useState("");
    const [dateUntil, setDateUntil] = useState("");

    const reportOptions = [
        { label: "Sales report", value: "sales" },
        { label: "MRN report", value: "mrn" },
        { label: "Service report", value: "service" }
    ];

    const data = [
        { date: "05-11-2025", type: "Sales", branch: "Bandung", total: "Rp 123", status: "Completed" },
        { date: "05-11-2025", type: "MRN", branch: "Bandung", total: "Rp 123", status: "Pending" },
        { date: "05-11-2025", type: "Service", branch: "Bandung", total: "Rp 123", status: "Completed" }
    ];

    return (
        <div className="p-6 text-white" style={{ backgroundColor: "#262421" }}>
            
            {/* ====== TOP FILTER BAR ====== */}
            <div className="flex items-center gap-6 mb-8">

                {/* Report type dropdown */}
                <div className="w-60">
                    <Filter
                        value={reportType}
                        onChange={setReportType}
                        options={reportOptions}
                        placeholder="Sales report"
                        className="text-black"
                    />
                </div>

                {/* From date */}
                <div className="flex items-center gap-3">
                    <span className="text-white text-sm">From:</span>
                    <div className="w-40">
                        <Input
                            variant="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="cursor-pointer"
                            icon={null}  // icon tidak diperlukan karena date picker punya icon sendiri
                        />
                    </div>
                </div>

                {/* Until date */}
                <div className="flex items-center gap-3">
                    <span className="text-white text-sm">Until:</span>
                    <div className="w-40">
                        <Input
                            variant="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="cursor-pointer"
                            icon={null}  // icon tidak diperlukan karena date picker punya icon sendiri
                        />
                    </div>
                </div>

            </div>

            {/* ====== SUMMARY CARDS ====== */}
            <div className="flex gap-6 mb-8">
                <SummaryCard label="Total transaction" value={100} />
                <SummaryCard label="Total Customer" value={100} />
                <SummaryCard label="Pending MRN" value={100} />
            </div>

            {/* ====== REPORT TABLE ====== */}
            <div className="overflow-x-auto rounded-lg mb-10">
                <table className="w-full border border-gray-700 text-black bg-white">

                    <thead>
                        <tr className="bg-red-300">
                            <th className="px-4 py-3 border border-gray-700 font-semibold">Date</th>
                            <th className="px-4 py-3 border border-gray-700 font-semibold">Report Type</th>
                            <th className="px-4 py-3 border border-gray-700 font-semibold">Dealer Branch</th>
                            <th className="px-4 py-3 border border-gray-700 font-semibold">Total Value</th>
                            <th className="px-4 py-3 border border-gray-700 font-semibold">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="bg-red-100">
                                <td className="border px-4 py-3">{row.date}</td>
                                <td className="border px-4 py-3">{row.type}</td>
                                <td className="border px-4 py-3">{row.branch}</td>
                                <td className="border px-4 py-3">{row.total}</td>
                                <td className="border px-4 py-3">{row.status}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* ====== BUTTONS ====== */}
            <div className="flex gap-6 mb-10">
                <Button
                    variant="danger"
                    className="rounded-full px-8 py-3 text-lg bg-red-600 hover:bg-red-700"
                >
                    Download PDF
                </Button>

                <Button
                    variant="danger"
                    className="rounded-full px-8 py-3 text-lg bg-red-600 hover:bg-red-700"
                >
                    Download Excel
                </Button>
            </div>
        </div>
    );
}


/* ====== SUMMARY CARD COMPONENT ====== */
function SummaryCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="px-6 py-4 rounded-2xl text-white font-semibold text-lg"
            style={{ backgroundColor: "#7B7B7B" }}>
            {label}: {value}
        </div>
    );
}