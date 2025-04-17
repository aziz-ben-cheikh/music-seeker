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
        const sql=`insert into music (name,artist,album,duration,release_year)
        values(?,?,?,?,?)`
        const values=[
            newmusic.name,
            newmusic.artist,
            newmusic.album,
            newmusic.duration,
            newmusic.release_year,
        ]
        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newmusic };
    }

    async findAll() {
        const sql = 'select * from music';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM music WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, musicData) {
        let musics = await this.readData();
        const index = musics.findIndex(music => music.id === id);
        if (index === -1) return null;

        musics[index] = { ...musics[index], ...musicData };
        await this.writeData(musics);
        return musics[index];
    }

    async delete(id) {
        let musics = await this.readData();
        const newmusics = musics.filter(music => music.id !== id);
        if (newmusics.length === musics.length) return null;

        await this.writeData(newmusics);
        return true;
    }
}

export default new musicRepository();
