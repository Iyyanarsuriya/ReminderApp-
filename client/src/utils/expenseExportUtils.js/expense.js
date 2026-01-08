import { generateCSV, generateTXT, generatePDF } from '../exportUtils/base';
import { formatAmount } from '../formatUtils';

export const exportExpenseToCSV = (data, filename) => {
    // Add Summary at the top of CSV for better readability in Excel
    let summary = { income: 0, expense: 0 };
    data.forEach(t => {
        if (t.type === 'income') summary.income += parseFloat(t.amount);
        else summary.expense += parseFloat(t.amount);
    });

    const summaryRows = [
        ["FINANCIAL REPORT SUMMARY"],
        ["Total Income", summary.income],
        ["Total Expense", summary.expense],
        ["Net Balance", summary.income - summary.expense],
        [] // Empty row
    ];

    const headers = ["Date", "Description", "Amount", "Type", "Category", "Project", "Member"];
    const rows = [
        ...summaryRows,
        headers,
        ...data.map(t => [
            new Date(t.date).toLocaleDateString('en-GB'),
            t.title,
            t.amount,
            t.type.toUpperCase(),
            t.category,
            t.project_name || 'N/A',
            t.member_name || 'N/A'
        ])
    ];

    generateCSV("", rows, filename);
};

export const exportExpenseToTXT = ({ data, period, filename }) => {
    let summary = { income: 0, expense: 0 };
    data.forEach(t => {
        if (t.type === 'income') summary.income += parseFloat(t.amount);
        else summary.expense += parseFloat(t.amount);
    });

    const stats = [
        { label: 'Total Income', value: `Rs. ${formatAmount(summary.income)}` },
        { label: 'Total Expense', value: `Rs. ${formatAmount(summary.expense)}` },
        { label: 'Net Balance', value: `Rs. ${formatAmount(summary.income - summary.expense)}` }
    ];

    const logHeaders = ["Date", "Description", "Amount", "Type", "Category", "Member"];
    const logRows = data.map(t => [
        new Date(t.date).toLocaleDateString('en-GB'),
        t.title,
        `Rs. ${formatAmount(t.amount)}`,
        t.type.toUpperCase(),
        t.category,
        t.member_name || '-'
    ]);

    generateTXT({ title: 'Financial Report', period, stats, logHeaders, logRows, filename });
};

export const exportExpenseToPDF = ({ data, period, subHeader, filename }) => {
    let summary = { income: 0, expense: 0 };
    data.forEach(t => {
        if (t.type === 'income') summary.income += parseFloat(t.amount);
        else summary.expense += parseFloat(t.amount);
    });

    const stats = [
        { label: 'Total Income', value: `Rs. ${formatAmount(summary.income)}` },
        { label: 'Total Expense', value: `Rs. ${formatAmount(summary.expense)}` },
        { label: 'Net Profit/Loss', value: `Rs. ${formatAmount(summary.income - summary.expense)}` },
        { label: 'Total Records', value: data.length.toString() }
    ];

    const tableHeaders = ['Date', 'Description', 'Category', 'Type', 'Project', 'Member', 'Amount'];
    const tableRows = data.map(t => [
        new Date(t.date).toLocaleDateString('en-GB'),
        t.title,
        t.category,
        t.type.toUpperCase(),
        t.project_name || '-',
        t.member_name || '-',
        `Rs. ${formatAmount(t.amount)}`
    ]);

    generatePDF({ title: 'Financial Report', period, subHeader, stats, tableHeaders, tableRows, filename, themeColor: [45, 91, 255] });
};
