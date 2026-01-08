import { generateCSV, generateTXT, generatePDF } from '../exportUtils/base';

export const exportReminderToCSV = (data, filename) => {
    // Add Summary
    const total = data.length;
    const completed = data.filter(r => r.is_completed).length;
    const pending = total - completed;

    const summaryRows = [
        ["REMINDER REPORT SUMMARY"],
        ["Total Tasks", total],
        ["Completed", completed],
        ["Pending", pending],
        [] // Empty row
    ];

    const headers = ["Due Date", "Title", "Description", "Priority", "Category", "Status"];
    const rows = [
        ...summaryRows,
        headers,
        ...data.map(r => [
            r.due_date ? new Date(r.due_date).toLocaleDateString('en-GB') : 'No Date',
            r.title,
            r.description || '',
            r.priority.toUpperCase(),
            r.category || 'General',
            r.is_completed ? 'COMPLETED' : 'PENDING'
        ])
    ];
    generateCSV("", rows, filename);
};

export const exportReminderToTXT = ({ data, period, filename }) => {
    const total = data.length;
    const completed = data.filter(r => r.is_completed).length;
    const pending = total - completed;

    const stats = [
        { label: 'Total Tasks', value: total },
        { label: 'Completed', value: completed },
        { label: 'Pending', value: pending }
    ];

    const logHeaders = ["Due Date", "Title", "Priority", "Category", "Status"];
    const logRows = data.map(r => [
        r.due_date ? new Date(r.due_date).toLocaleDateString('en-GB') : 'No Date',
        r.title,
        r.priority.toUpperCase(),
        r.category || 'General',
        r.is_completed ? 'COMPLETED' : 'PENDING'
    ]);

    generateTXT({ title: 'Reminder Report', period, stats, logHeaders, logRows, filename });
};

export const exportReminderToPDF = ({ data, period, subHeader, filename }) => {
    const total = data.length;
    const completed = data.filter(r => r.is_completed).length;
    const pending = total - completed;

    const stats = [
        { label: 'Total Tasks', value: total.toString() },
        { label: 'Completed', value: completed.toString() },
        { label: 'Pending', value: pending.toString() }
    ];

    const tableHeaders = ['Due Date', 'Title', 'Category', 'Priority', 'Status'];
    const tableRows = data.map(r => [
        r.due_date ? new Date(r.due_date).toLocaleDateString('en-GB') : 'No Date',
        r.title,
        r.category || 'General',
        r.priority.toUpperCase(),
        r.is_completed ? 'COMPLETED' : 'PENDING'
    ]);

    generatePDF({ title: 'Reminder Report', period, subHeader, stats, tableHeaders, tableRows, filename, themeColor: [45, 91, 255] });
};
