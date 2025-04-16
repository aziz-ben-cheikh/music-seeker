import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";


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
        const playlists = await this.readData();
        newplaylist.id = Date.now().toString();
        playlists.push(newplaylist);
        await this.writeData(playlists);
        return newplaylist;
    }

    async findAll() {
        const sql = 'select * from users';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findById(id) {
        const playlists = await this.readData();
        return playlists.find(playlist => playlist.id === id);
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
        let playlists = await this.readData();
        const newplaylists = playlists.filter(playlist => playlist.id !== id);
        if (newplaylists.length === playlists.length) return null;

        await this.writeData(newplaylists);
        return true;
    }
}

export default new playlistRepository();
