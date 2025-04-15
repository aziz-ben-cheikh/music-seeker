import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
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
        const playlist_likes = await this.readData();
        newplaylist_like.id = Date.now().toString();
        playlist_likes.push(newplaylist_like);
        await this.writeData(playlist_likes);
        return newplaylist_like;
    }

    async findAll() {
        return await this.readData();
    }

    async findById(id) {
        const playlist_likes = await this.readData();
        return playlist_likes.find(playlist_like => playlist_like.id === id);
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
        let playlist_likes = await this.readData();
        const newplaylist_likes = playlist_likes.filter(playlist_like => playlist_like.id !== id);
        if (newplaylist_likes.length === playlist_likes.length) return null;

        await this.writeData(newplaylist_likes);
        return true;
    }
}

export default new playlist_likeRepository();
