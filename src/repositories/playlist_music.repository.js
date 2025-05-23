import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/playlist_music.json");

class playlist_musicRepository {
  async readData() {
    try {
      const data = await fs.readJson(filePath);
      return data.playlist_music || [];
    } catch {
      return [];
    }
  }

  async writeData(playlist_music) {
    await fs.writeJson(filePath, { playlist_music }, { spaces: 2 });
  }

  async create(newplaylist_music) {
    const sql = `insert into playlist_music (playlist_id, music_id)
    values (?,?)`;
    const values = [newplaylist_music.playlist_id, newplaylist_music.music_id];

    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...newplaylist_music };
  }

  async findAll() {
    const sql = "select * from playlist_music";
    const [result] = await db.execute(sql);
    return result;
  }

  async findByid(id) {
    const sql = "SELECT * FROM playlist_music WHERE playlist_id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  }

  async update(id, playlist_musicData) {
    const fields = Object.keys(playlist_musicData);
    if (fields.length === 0) return null;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = Object.values(playlist_musicData);
    const sql = `UPDATE playlist_music SET ${setClause} WHERE playlist_id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;

    const [updatedUserRows] = await db.execute(
      "SELECT * FROM playlist_music WHERE playlist_id = ?",
      [id]
    );
    return updatedUserRows[0];
  }

  async delete(id) {
    const sql = "DELETE FROM playlist_music WHERE playlist_id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new playlist_musicRepository();
