import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/like.json");

class likeRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.like || [];
        } catch {
            return [];
        }
    }

    async writeData(like) {
        await fs.writeJson(filePath, { like }, { spaces: 2 });
    }

    async create(newlike) {
        const likes = await this.readData();
        newlike.id = Date.now().toString();
        likes.push(newlike);
        await this.writeData(likes);
        return newlike;
    }

    async findAll() {
        return await this.readData();
    }

    async findById(id) {
        const likes = await this.readData();
        return likes.find(like => like.id === id);
    }

    async update(id, likeData) {
        let likes = await this.readData();
        const index = likes.findIndex(like => like.id === id);
        if (index === -1) return null;

        likes[index] = { ...likes[index], ...likeData };
        await this.writeData(likes);
        return likes[index];
    }

    async delete(id) {
        let likes = await this.readData();
        const newlikes = likes.filter(like => like.id !== id);
        if (newlikes.length === likes.length) return null;

        await this.writeData(newlikes);
        return true;
    }
}

export default new likeRepository();
