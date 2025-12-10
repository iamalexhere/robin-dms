export interface Report {
    id: string;
    category: string;
    name: string;
    desc: string;
    icon: string;
}

export interface ReportCategory {
    id: string;
    name: string;
    count: number;
}

export interface GeneratedReport {
    name: string;
    dateFrom: string;
    dateTo: string;
    format: string;
    generatedAt: string;
    status: string;
}