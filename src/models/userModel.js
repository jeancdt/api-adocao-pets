const db = require('../config/database');

class UserModel {
    // Find User
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        return rows[0];
    }

    // New User
    static async create(user) {
        const { name, email, password, role, phone } = user;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, role, phone]
        );

        return result.insertId;
    }
}

module.exports = UserModel;
