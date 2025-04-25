import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/playlist.json");

class playlistRepository {
  async readData() {
    try {
      const data = await fs.readJson(filePath);
      return data.playlist || [];
    } catch {
      return [];
    }
  }

  async writeData(playlist) {
    await fs.writeJson(filePath, { playlist }, { spaces: 2 });
  }

  async create(newplaylist) {
    const sql = `insert into playlists (user_id,name)
        values (?,?)`;
    const values = [newplaylist.user_id, newplaylist.name];

    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...newplaylist };
  }

  async findAll() {
    const sql = "select * from playlists";
    const [result] = await db.execute(sql);
    return result;
  }

  async findByid(id) {
    const sql = "SELECT * FROM playlists WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  }

  async update(id, playlistData) {
    const fields = Object.keys(playlistData);
    if (fields.length === 0) return null;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = Object.values(playlistData);
    const sql = `UPDATE playlists SET ${setClause} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;

    const [updatedUserRows] = await db.execute(
      "SELECT * FROM playlists WHERE id = ?",
      [id]
    );
    return updatedUserRows[0];
  }

  async delete(id) {
    const sql = "DELETE FROM playlists WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new playlistRepository();
