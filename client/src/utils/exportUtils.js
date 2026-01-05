import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Standardized Export Utility for CSV, TXT, and PDF
 */

export const exportToCSV = (headers, rows, filename) => {
    // Escape values with commas
    const escapedRows = rows.map(row =>
        row.map(val => {
            const str = String(val === null || val === undefined ? '' : val);
            return str.includes(',') ? `"${str}"` : str;
        })
    );

    const csvContent = [headers, ...escapedRows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.click();
};

export const exportToTXT = ({ title, period, stats, logHeaders, logRows, filename }) => {
    let txt = `${title.toUpperCase()}\n`;
    const now = new Date();
    const nowFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    txt += `Period: ${period}\n`;
    txt += `Generated on: ${nowFormatted}\n\n`;

    if (stats && stats.length > 0) {
        txt += `SUMMARY\n`;
        txt += `-------------------\n`;
        stats.forEach(s => {
            txt += `${s.label}: ${s.value}\n`;
        });
        txt += `\n`;
    }

    txt += `LOGS\n`;
    txt += `-------------------\n`;
    txt += logHeaders.join(' | ') + '\n';
    logRows.forEach(row => {
        txt += row.join(' | ') + '\n';
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${filename}.txt`);
    link.click();
};

export const exportToPDF = ({ title, period, subHeader, stats, tableHeaders, tableRows, filename, themeColor = [45, 91, 255] }) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(title, 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    const now = new Date();
    const nowFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    doc.text(`Generated on: ${nowFormatted}`, 14, 30);
    doc.text(`Period: ${period}`, 14, 35);
    if (subHeader) doc.text(subHeader, 14, 40);

    // Summary Box
    let startY = 45;
    if (stats && stats.length > 0) {
        const boxHeight = 10 + (stats.length * 7);
        doc.setDrawColor(230);
        doc.setFillColor(245, 247, 250);
        doc.rect(14, 45, 182, boxHeight, 'F');
        doc.setFontSize(11);
        doc.setTextColor(40);
        stats.forEach((s, i) => {
            doc.text(`${s.label}: ${s.value}`, 20, 55 + (i * 7));
        });
        startY = 45 + boxHeight + 10;
    }

    autoTable(doc, {
        startY: startY,
        head: [tableHeaders],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: themeColor },
        alternateRowStyles: { fillColor: [250, 250, 250] },
    });

    doc.save(`${filename}.pdf`);
};
