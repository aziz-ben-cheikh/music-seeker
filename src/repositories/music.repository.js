import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
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
        const musics = await this.readData();
        newmusic.id = Date.now().toString();
        musics.push(newmusic);
        await this.writeData(musics);
        return newmusic;
    }

    async findAll() {
        return await this.readData();
    }

    async findById(id) {
        const musics = await this.readData();
        return musics.find(music => music.id === id);
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
