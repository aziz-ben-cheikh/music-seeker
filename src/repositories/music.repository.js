import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/music.json");

class musicRepository {
  async readData() {
    try {
      const data = await fs.readJson(filePath);
      return data.music || [];
    } catch {
      return [];
    }
  }

  async writeData(music) {
    await fs.writeJson(filePath, { music }, { spaces: 2 });
  }

  async create(newmusic) {
    const sql = `insert into music (name,artist,album,duration,release_year)
        values(?,?,?,?,?)`;
    const values = [
      newmusic.name,
      newmusic.artist,
      newmusic.album,
      newmusic.duration,
      newmusic.release_year,
    ];
    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...newmusic };
  }

  async findAll() {
    const sql = "select * from music";
    const [result] = await db.execute(sql);
    return result;
  }

  async findByid(id) {
    const sql = "SELECT * FROM music WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  }

  async update(id, musicData) {
    const fields = Object.keys(musicData);
    if (fields.length === 0) return null;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = Object.values(musicData);
    const sql = `UPDATE music SET ${setClause} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;

    const [updatedUserRows] = await db.execute(
      "SELECT * FROM music WHERE id = ?",
      [id]
    );
    return updatedUserRows[0];
  }

  async delete(id) {
    const sql = "DELETE FROM music WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new musicRepository();
