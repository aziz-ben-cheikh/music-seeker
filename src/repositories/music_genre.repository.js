import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";

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
        const music_genres = await this.readData();
        newmusic_genre.id = Date.now().toString();
        music_genres.push(newmusic_genre);
        await this.writeData(music_genres);
        return newmusic_genre;
    }

    async findAll() {
        const sql = 'select * from users';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findById(id) {
        const music_genres = await this.readData();
        return music_genres.find(music_genre => music_genre.id === id);
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
