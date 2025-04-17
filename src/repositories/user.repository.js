import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/user.json");

class userRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.user || [];
        } catch {
            return [];
        }
    }

    async writeData(user) {
        await fs.writeJson(filePath, { user }, { spaces: 2 });
    }

    async create(newuser) {
        const sql = `
            INSERT INTO users (username, first_name, last_name, email, password_hash, bio, profile_pic_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            newuser.username,
            newuser.first_name,
            newuser.last_name,
            newuser.email,
            newuser.password_hash,
            newuser.bio || null,
            newuser.profile_pic_url || null,
        ];

        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newuser };
    }

    async findAll() {
        const sql = 'select * from users';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, userData) {
        let users = await this.readData();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...userData };
        await this.writeData(users);
        return users[index];
    }

    async delete(id) {
        let users = await this.readData();
        const newusers = users.filter(user => user.id !== id);
        if (newusers.length === users.length) return null;

        await this.writeData(newusers);
        return true;
    }
}

export default new userRepository();
