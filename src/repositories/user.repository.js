import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../database.js";

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
            INSERT INTO users (username, first_name, last_name, email, password_hash, roles, bio, profile_pic_url)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)
        `;

    const values = [
      newuser.username,
      newuser.first_name,
      newuser.last_name,
      newuser.email,
      newuser.password_hash,
      newuser.roles,
      newuser.bio || null,
      newuser.profile_pic_url || null,
    ];

    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...newuser };
  }

  async findAll() {
    const sql = "select * from users";
    const [result] = await db.execute(sql);
    return result;
  }

  async findByid(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  }

  async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    return rows[0] || null;
  }

  async update(id, userData) {
    const fields = Object.keys(userData);
    if (fields.length === 0) return null;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = Object.values(userData);
    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;

    const [updatedUserRows] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return updatedUserRows[0];
  }

  async delete(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new userRepository();
