const db = require('../config/db');

class WorkType {
    static async create(userId, name) {
        const [result] = await db.query(
            'INSERT INTO work_types (user_id, name) VALUES (?, ?)',
            [userId, name]
        );
        return { id: result.insertId, name, user_id: userId };
    }

    static async getAll(userId) {
        const [rows] = await db.query(
            'SELECT * FROM work_types WHERE user_id = ? ORDER BY name ASC',
            [userId]
        );
        return rows;
    }

    static async delete(id, userId) {
        const [result] = await db.query(
            'DELETE FROM work_types WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = WorkType;
