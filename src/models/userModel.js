const db = require('../config/database');

class UserModel {
    // Find User
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        return rows[0];
    }

    // New User
    static async create(user) {
        const { email, password, role } = user;
        const [result] = await db.query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, password, role]
        );

        return result.insertId;
    }
}

module.exports = UserModel;
