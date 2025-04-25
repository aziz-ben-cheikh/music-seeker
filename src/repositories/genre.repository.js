import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/genre.json");

class genreRepository {
  async readData() {
    try {
      const data = await fs.readJson(filePath);
      return data.genre || [];
    } catch {
      return [];
    }
  }

  async writeData(genre) {
    await fs.writeJson(filePath, { genre }, { spaces: 2 });
  }

  async create(newgenre) {
    const sql = `insert into genre (name)
        VALUES (?)`;
    const VALUES = [newgenre.name];
    const [result] = await db.execute(sql, VALUES);
    return { id: result.insertId, ...newgenre };
  }

  async findAll() {
    const sql = "select * from genre";
    const [result] = await db.execute(sql);
    return result;
  }

  async findByid(id) {
    const sql = "SELECT * FROM genre WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  }

  async update(id, genreData) {
    const fields = Object.keys(genreData);
    if (fields.length === 0) return null;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = Object.values(genreData);
    const sql = `UPDATE genre SET ${setClause} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;

    const [updatedUserRows] = await db.execute(
      "SELECT * FROM genre WHERE id = ?",
      [id]
    );
    return updatedUserRows[0];
  }

  async delete(id) {
    const sql = "DELETE FROM genre WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new genreRepository();
