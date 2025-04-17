import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/playlist_like.json");

class playlist_likeRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.playlist_like || [];
        } catch {
            return [];
        }
    }

    async writeData(playlist_like) {
        await fs.writeJson(filePath, { playlist_like }, { spaces: 2 });
    }

    async create(newplaylist_like) {
        const sql=`insert into playlist_likes (user_id,playlist_id)
        values (?,?)`;
        const values=[
            newplaylist_like.user_id,
            newplaylist_like.playlist_id,
        ];
        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newplaylist_like };
    }

    async findAll() {
        const sql = 'select * from playlist_likes';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM playlist_likes WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, playlist_likeData) {
        const fields = Object.keys(playlist_likeData);
        if (fields.length === 0) return null;

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const values = Object.values(playlist_likeData);
        const sql = `UPDATE playlist_likes SET ${setClause} WHERE id = ?`;
        values.push(id);

        const [result] = await db.execute(sql, values);
        if (result.affectedRows === 0) return null;

        const [updatedUserRows] = await db.execute('SELECT * FROM playlist_likes WHERE id = ?', [id]);
        return updatedUserRows[0];
    }

    async delete(id) {
        const sql = 'DELETE FROM playlist_likes WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new playlist_likeRepository();
