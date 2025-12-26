const db = require('../Config/db');

exports.getAllByUserId = async (userId) => {
    const [rows] = await db.query('SELECT * FROM reminders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
};

exports.create = async (reminderData) => {
    const { user_id, title, description, due_date, priority, google_event_id } = reminderData;

    const dateObj = due_date ? new Date(due_date) : null;
    const finalDate = (dateObj && !isNaN(dateObj.getTime())) ? dateObj : null;

    const [result] = await db.query(
        'INSERT INTO reminders (user_id, title, description, due_date, priority, google_event_id) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, title, description, finalDate, priority || 'medium', google_event_id || null]
    );
    return { id: result.insertId, ...reminderData, is_completed: false };
};

exports.updateGoogleEventId = async (id, googleEventId) => {
    const [result] = await db.query(
        'UPDATE reminders SET google_event_id = ? WHERE id = ?',
        [googleEventId, id]
    );
    return result.affectedRows > 0;
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
