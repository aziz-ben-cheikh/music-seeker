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
        const sql=`insert into playlists (user_id,name)
        values (?,?)`;
        const values=[
        newplaylist.user_id,
        newplaylist.name,];

        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newplaylist };
    }

    async findAll() {
        const sql = 'select * from playlists';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM playlists WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, playlistData) {
        let playlists = await this.readData();
        const index = playlists.findIndex(playlist => playlist.id === id);
        if (index === -1) return null;

        playlists[index] = { ...playlists[index], ...playlistData };
        await this.writeData(playlists);
        return playlists[index];
    }

    async delete(id) {
        const sql = 'DELETE FROM playlists WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default new playlistRepository();
