const db = require('../config/db');

class MemberRole {
    static async create(userId, name) {
        const [result] = await db.query(
            'INSERT INTO member_roles (user_id, name) VALUES (?, ?)',
            [userId, name]
        );
        return { id: result.insertId, user_id: userId, name };
    }

    static async getAllByUserId(userId) {
        const [rows] = await db.query(
            'SELECT * FROM member_roles WHERE user_id = ? ORDER BY name ASC',
            [userId]
        );
        return rows;
    }

    static async delete(id, userId) {
        const [result] = await db.query(
            'DELETE FROM member_roles WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = MemberRole;
