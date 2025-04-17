import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/like.json");

class likeRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.like || [];
        } catch {
            return [];
        }
    }

    async writeData(like) {
        await fs.writeJson(filePath, { like }, { spaces: 2 });
    }

    async create(newlike) {
        const sql=`insert into likes (user_id,music_id)
        values (?,?)`
        const values=[
            newlike.user_id,
            newlike.music_id,
        ];
        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newlike };
    }

    async findAll() {
        const sql = 'select * from likes';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM likes WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, likeData) {
        const fields = Object.keys(likeData);
        if (fields.length === 0) return null;

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const values = Object.values(likeData);
        const sql = `UPDATE likes SET ${setClause} WHERE id = ?`;
        values.push(id);

        const [result] = await db.execute(sql, values);
        if (result.affectedRows === 0) return null;

        const [updatedUserRows] = await db.execute('SELECT * FROM likes WHERE id = ?', [id]);
        return updatedUserRows[0];
    }

    async delete(id) {
        const sql = 'DELETE FROM likes WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new likeRepository();
