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
        let playlist_likes = await this.readData();
        const index = playlist_likes.findIndex(playlist_like => playlist_like.id === id);
        if (index === -1) return null;

        playlist_likes[index] = { ...playlist_likes[index], ...playlist_likeData };
        await this.writeData(playlist_likes);
        return playlist_likes[index];
    }

    async delete(id) {
        const sql = 'DELETE FROM playlist_likes WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new playlist_likeRepository();
