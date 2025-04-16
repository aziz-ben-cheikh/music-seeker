import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";


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
        const playlist_musics = await this.readData();
        newplaylist_music.id = Date.now().toString();
        playlist_musics.push(newplaylist_music);
        await this.writeData(playlist_musics);
        return newplaylist_music;
    }

    async findAll() {
        const sql = 'select * from users';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findById(id) {
        const playlist_musics = await this.readData();
        return playlist_musics.find(playlist_music => playlist_music.id === id);
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
        let playlist_musics = await this.readData();
        const newplaylist_musics = playlist_musics.filter(playlist_music => playlist_music.id !== id);
        if (newplaylist_musics.length === playlist_musics.length) return null;

        await this.writeData(newplaylist_musics);
        return true;
    }
}

export default new playlist_musicRepository();
