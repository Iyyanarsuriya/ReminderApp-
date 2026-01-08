const db = require('../config/db');

class VehicleLog {
    static async create(data) {
        const { user_id, vehicle_name, vehicle_number, driver_name, in_time, out_time, start_km, end_km, expense_amount, income_amount, notes } = data;
        const [result] = await db.query(
            'INSERT INTO vehicle_logs (user_id, vehicle_name, vehicle_number, driver_name, in_time, out_time, start_km, end_km, expense_amount, income_amount, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, vehicle_name || null, vehicle_number, driver_name || null, in_time || null, out_time || null, start_km || null, end_km || null, expense_amount || 0, income_amount || 0, notes || null]
        );
        return { id: result.insertId, ...data };
    }

    static async getAll(user_id) {
        const [rows] = await db.query('SELECT * FROM vehicle_logs WHERE user_id = ? ORDER BY in_time DESC, created_at DESC', [user_id]);
        return rows;
    }

    static async update(id, data) {
        const { vehicle_name, vehicle_number, driver_name, in_time, out_time, start_km, end_km, expense_amount, income_amount, notes } = data;
        await db.query(
            'UPDATE vehicle_logs SET vehicle_name = ?, vehicle_number = ?, driver_name = ?, in_time = ?, out_time = ?, start_km = ?, end_km = ?, expense_amount = ?, income_amount = ?, notes = ? WHERE id = ?',
            [vehicle_name || null, vehicle_number, driver_name || null, in_time || null, out_time || null, start_km || null, end_km || null, expense_amount || 0, income_amount || 0, notes || null, id]
        );
        return { id, ...data };
    }

    static async delete(id) {
        await db.query('DELETE FROM vehicle_logs WHERE id = ?', [id]);
    }
}

module.exports = VehicleLog;
