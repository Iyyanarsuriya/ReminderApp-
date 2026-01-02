const db = require('../config/db');

exports.getAllByUserId = async (userId) => {
    const [rows] = await db.query('SELECT * FROM categories WHERE user_id = ? ORDER BY name ASC', [userId]);
    return rows;
};

exports.create = async (categoryData) => {
    const { user_id, name, color } = categoryData;
    const [result] = await db.query(
        'INSERT INTO categories (user_id, name, color) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
        [user_id, name, color || '#2d5bff']
    );
    return { id: result.insertId || null, ...categoryData };
};

exports.delete = async (id, userId) => {
    const [result] = await db.query(
        'DELETE FROM categories WHERE id = ? AND user_id = ?',
        [id, userId]
    );
    return result.affectedRows > 0;
};

exports.seedDefaultCategories = async (userId) => {
    const defaults = [
        { name: 'General', color: '#64748b' },
        { name: 'Work', color: '#2d5bff' },
        { name: 'Personal', color: '#00d1a0' },
        { name: 'Health', color: '#ef4444' },
        { name: 'Study', color: '#8b5cf6' },
        { name: 'Finance', color: '#f59e0b' }
    ];

    for (const cat of defaults) {
        await this.create({ user_id: userId, name: cat.name, color: cat.color });
    }
};
