import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/music_genre.json");

class music_genreRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.music_genre || [];
        } catch {
            return [];
        }
    }

    async writeData(music_genre) {
        await fs.writeJson(filePath, { music_genre }, { spaces: 2 });
    }

    async create(newmusic_genre) {
        const sql=`insert into music_genre (music_id,genre_id)
        values (?,?)`;

        const values=[
            newmusic_genre.music_id,
            newmusic_genre.genre_id,
        ];
        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newmusic_genre };
    }

    async findAll() {
        const sql = 'select * from music_genre';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM music_genre WHERE music_id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, music_genreData) {
        const fields = Object.keys(music_genreData);
        if (fields.length === 0) return null;

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const values = Object.values(music_genreData);
        const sql = `UPDATE music_genre SET ${setClause} WHERE music_id = ?`;
        values.push(id);

        const [result] = await db.execute(sql, values);
        if (result.affectedRows === 0) return null;

        const [updatedUserRows] = await db.execute('SELECT * FROM music_genre WHERE music_id = ?', [id]);
        return updatedUserRows[0];
    }

    async delete(id) {
        const sql = 'DELETE FROM music_genre WHERE music_id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new music_genreRepository();
