const db = require('../Config/db');

exports.getAllByUserId = async (userId) => {
    const [rows] = await db.query('SELECT * FROM reminders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
};

exports.create = async (reminderData) => {
    const { user_id, title, description, due_date, priority } = reminderData;

    // Use Date object - mysql2 formats this correctly for DATETIME columns
    const dateObj = due_date ? new Date(due_date) : null;
    const finalDate = (dateObj && !isNaN(dateObj.getTime())) ? dateObj : null;

    const [result] = await db.query(
        'INSERT INTO reminders (user_id, title, description, due_date, priority) VALUES (?, ?, ?, ?, ?)',
        [user_id, title, description, finalDate, priority || 'medium']
    );
    return { id: result.insertId, ...reminderData, is_completed: false };
};

exports.updateStatus = async (id, userId, is_completed) => {
    const [result] = await db.query(
        'UPDATE reminders SET is_completed = ? WHERE id = ? AND user_id = ?',
        [is_completed, id, userId]
    );
    return result.affectedRows > 0;
};

exports.delete = async (id, userId) => {
    const [result] = await db.query(
        'DELETE FROM reminders WHERE id = ? AND user_id = ?',
        [id, userId]
    );
    return result.affectedRows > 0;
};
