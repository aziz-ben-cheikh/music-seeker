import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/follow.json");

class FollowRepository {
  async readData() {
    try {
      const data = await fs.readJson(filePath);
      return data.follow || [];
    } catch {
      return [];
    }
  }

  async writeData(follow) {
    await fs.writeJson(filePath, { follow }, { spaces: 2 });
  }

  async create(newFollow) {
    const sql = `insert into follows (follower_id,following_id)
        values (?,?)`;
    const values = [newFollow.follower_id, newFollow.following_id];
    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...newFollow };
  }

  async findAll() {
    const sql = "select * from follows";
    const [result] = await db.execute(sql);
    return result;
  }

  async findByid(id) {
    const sql = "SELECT * FROM follows WHERE follower_id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  }

  async update(id, followData) {
    const fields = Object.keys(followData);
    if (fields.length === 0) return null;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = Object.values(followData);
    const sql = `UPDATE follows SET ${setClause} WHERE follower_id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;

    const [updatedUserRows] = await db.execute(
      "SELECT * FROM follows WHERE follower_id = ?",
      [id]
    );
    return updatedUserRows[0];
  }

  async delete(id) {
    const sql = "DELETE FROM follows WHERE follower_id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new FollowRepository();
