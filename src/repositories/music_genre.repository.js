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
        const sql = 'SELECT * FROM music_genre WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id, music_genreData) {
        let music_genres = await this.readData();
        const index = music_genres.findIndex(music_genre => music_genre.id === id);
        if (index === -1) return null;

        music_genres[index] = { ...music_genres[index], ...music_genreData };
        await this.writeData(music_genres);
        return music_genres[index];
    }

    async delete(id) {
        let music_genres = await this.readData();
        const newmusic_genres = music_genres.filter(music_genre => music_genre.id !== id);
        if (newmusic_genres.length === music_genres.length) return null;

        await this.writeData(newmusic_genres);
        return true;
    }
}

export default new music_genreRepository();
