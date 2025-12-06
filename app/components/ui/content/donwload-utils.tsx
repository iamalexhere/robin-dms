import type { Report } from './type-and-data';

const generateDummyData = (report: Report, dateFrom: string, dateTo: string) => {
    const rows = [];
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const numRows = Math.min(daysDiff, 30);

    for (let i = 0; i < numRows; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        rows.push({
            date: currentDate.toISOString().split('T')[0],
            transactions: Math.floor(Math.random() * 10000) + 1000,
            items: Math.floor(Math.random() * 5000) + 500,
            status: ['Completed', 'Pending', 'In Progress'][Math.floor(Math.random() * 3)],
            amount: `$${(Math.random() * 10000).toFixed(2)}`
        });
    }
    return rows;
};

const getBase64Image = (url: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => resolve('');
        img.src = url;
    });
};

// ============================================
// PDF TEMPLATE
// ============================================
const createPDFTemplate = (report: Report, dateFrom: string, dateTo: string, data: any[], logoBase64: string) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #000000;
            color: #ffffff;
            padding: 30px;
            line-height: 1.5;
            width: 1000px;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #1a1a1a;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(233, 69, 96, 0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            text-align: center;
            padding: 35px 25px;
            border-bottom: 4px solid #e94560;
        }
        
        .logo {
            max-width: 180px;
            max-height: 90px;
            margin-bottom: 18px;
            ${!logoBase64 ? 'display: none;' : ''}
        }
        
        h1 {
            color: #e94560;
            font-size: 34px;
            margin-bottom: 10px;
            font-weight: 700;
            text-shadow: 0 2px 8px rgba(233, 69, 96, 0.4);
        }
        
        h2 {
            color: #ffffff;
            font-size: 24px;
            margin: 10px 0;
            font-weight: 600;
        }
        
        .subtitle {
            color: #999;
            font-size: 15px;
            margin-top: 6px;
        }
        
        .info-section {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            padding: 28px;
            background: #0d0d0d;
            border-bottom: 2px solid #2d2d2d;
        }
        
        .info-card {
            text-align: center;
            background: #1a1a1a;
            padding: 18px;
            border-radius: 8px;
            border-left: 4px solid #e94560;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .info-label {
            color: #777;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.1px;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .info-value {
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
        }
        
        .table-container {
            padding: 28px;
            background: #1a1a1a;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            background: #0d0d0d;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid #2d2d2d;
        }
        
        thead {
            background: #e94560;
        }
        
        th {
            padding: 14px 12px;
            text-align: left;
            font-weight: 700;
            font-size: 12px;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        th:last-child {
            border-right: none;
        }
        
        tbody tr {
            border-bottom: 1px solid #2d2d2d;
        }
        
        tbody tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.02);
        }
        
        tbody tr:hover {
            background: rgba(233, 69, 96, 0.08);
        }
        
        td {
            padding: 12px;
            color: #cccccc;
            font-size: 12px;
            border-right: 1px solid #2d2d2d;
        }
        
        td:last-child {
            border-right: none;
        }
        
        .status {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 14px;
            font-size: 10px;
            font-weight: 700;
        }
        
        .status.completed {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid #4ade80;
        }
        
        .status.pending {
            background: rgba(251, 146, 60, 0.2);
            color: #fbbf24;
            border: 1px solid #fbbf24;
        }
        
        .status.in-progress {
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            border: 1px solid #60a5fa;
        }
        
        .footer {
            padding: 25px;
            background: #0d0d0d;
            text-align: center;
            border-top: 3px solid #e94560;
        }
        
        .footer p {
            margin: 5px 0;
            color: #777;
            font-size: 11px;
        }
        
        .footer .copyright {
            font-weight: 700;
            color: #ffffff;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ${logoBase64 ? `<img src="${logoBase64}" alt="ROBIN DMS Logo" class="logo">` : ''}
            <h1>ROBIN DMS</h1>
            <h2>${report.name}</h2>
            <p class="subtitle">${report.desc}</p>
        </div>
        
        <div class="info-section">
            <div class="info-card">
                <div class="info-label">Report Period</div>
                <div class="info-value">${dateFrom} to ${dateTo}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Generated On</div>
                <div class="info-value">${new Date().toLocaleString()}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Total Records</div>
                <div class="info-value">${data.length} entries</div>
            </div>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transactions</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            <td><strong>${row.date}</strong></td>
                            <td>${row.transactions.toLocaleString()}</td>
                            <td>${row.items.toLocaleString()}</td>
                            <td>
                                <span class="status ${row.status.toLowerCase().replace(' ', '-')}">
                                    ${row.status}
                                </span>
                            </td>
                            <td><strong>${row.amount}</strong></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="footer">
            <p class="copyright">© ${new Date().getFullYear()} ROBIN DMS. All rights reserved.</p>
            <p>This is a system generated report. No signature required.</p>
            <p>Generated by ${report.category.charAt(0).toUpperCase() + report.category.slice(1)} Module</p>
        </div>
    </div>
</body>
</html>`;
};

// ============================================
// DOWNLOAD FUNCTIONS
// ============================================
export const downloadPDF = async (report: Report, dateFrom: string, dateTo: string) => {
    const data = generateDummyData(report, dateFrom, dateTo);

    let logoBase64 = '';
    try {
        logoBase64 = await getBase64Image('/image/base_logo@2.png');
    } catch (e) {
        console.log('Logo not loaded');
    }

    const htmlContent = createPDFTemplate(report, dateFrom, dateTo, data, logoBase64);

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '1000px';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        setTimeout(async () => {
            try {
                const html2canvasScript = document.createElement('script');
                html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

                html2canvasScript.onload = async () => {
                    const jspdfScript = document.createElement('script');
                    jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

                    jspdfScript.onload = async () => {
                        const canvas = await (window as any).html2canvas(iframeDoc.body, {
                            backgroundColor: '#000000',
                            scale: 2,
                            logging: false,
                            useCORS: true
                        });

                        const imgData = canvas.toDataURL('image/png');
                        const { jsPDF } = (window as any).jspdf;
                        const pdf = new jsPDF({
                            orientation: 'portrait',
                            unit: 'mm',
                            format: 'a4'
                        });

                        const imgWidth = 210;
                        const pageHeight = 297;
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        let heightLeft = imgHeight;
                        let position = 0;

                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;

                        while (heightLeft >= 0) {
                            position = heightLeft - imgHeight;
                            pdf.addPage();
                            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                            heightLeft -= pageHeight;
                        }

                        pdf.save(`${report.name.replace(/\s+/g, '_')}_${dateFrom}_to_${dateTo}.pdf`);
                        document.body.removeChild(iframe);
                    };

                    document.head.appendChild(jspdfScript);
                };

                document.head.appendChild(html2canvasScript);
            } catch (error) {
                console.error('Error generating PDF:', error);
                document.body.removeChild(iframe);
                alert('Error generating PDF. Please try again.');
            }
        }, 1000);
    }
};

export const downloadExcel = (report: Report, dateFrom: string, dateTo: string) => {
    const data = generateDummyData(report, dateFrom, dateTo);

    let csvContent = '\uFEFF';
    csvContent += `ROBIN DMS - ${report.name}\n`;
    csvContent += `${report.desc}\n`;
    csvContent += `Report Period: ${dateFrom} to ${dateTo}\n`;
    csvContent += `Generated: ${new Date().toLocaleString()}\n`;
    csvContent += `Total Records: ${data.length}\n\n`;
    csvContent += 'Date,Transactions,Items,Status,Amount\n';

    data.forEach(row => {
        csvContent += `${row.date},${row.transactions},${row.items},${row.status},"${row.amount}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}_${dateFrom}_to_${dateTo}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const downloadCSV = (report: Report, dateFrom: string, dateTo: string) => {
    const data = generateDummyData(report, dateFrom, dateTo);

    let csvContent = 'Date,Transactions,Items,Status,Amount\n';
    data.forEach(row => {
        csvContent += `${row.date},${row.transactions},${row.items},${row.status},"${row.amount}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}_${dateFrom}_to_${dateTo}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};