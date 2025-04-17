import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";


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
    const sql=`insert into playlist_music (playlist_id, music_id)
    values (?,?)`;
    const values=[
        newplaylist_music.playlist_id,
        newplaylist_music.music_id,
    ];

    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...newplaylist_music };
    }

    async findAll() {
        const sql = 'select * from playlist_music';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM playlist_music WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, playlist_musicData) {
        let playlist_musics = await this.readData();
        const index = playlist_musics.findIndex(playlist_music => playlist_music.id === id);
        if (index === -1) return null;

        playlist_musics[index] = { ...playlist_musics[index], ...playlist_musicData };
        await this.writeData(playlist_musics);
        return playlist_musics[index];
    }

    async delete(id) {
        const sql = 'DELETE FROM playlist_music WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new playlist_musicRepository();
