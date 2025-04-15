import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/genre.json");

class genreRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.genre || [];
        } catch {
            return [];
        }
    }

    async writeData(genre) {
        await fs.writeJson(filePath, { genre }, { spaces: 2 });
    }

    async create(newgenre) {
        const genres = await this.readData();
        newgenre.id = Date.now().toString();
        genres.push(newgenre);
        await this.writeData(genres);
        return newgenre;
    }

    async findAll() {
        return await this.readData();
    }

    async findById(id) {
        const genres = await this.readData();
        return genres.find(genre => genre.id === id);
    }

    async update(id, genreData) {
        let genres = await this.readData();
        const index = genres.findIndex(genre => genre.id === id);
        if (index === -1) return null;

        genres[index] = { ...genres[index], ...genreData };
        await this.writeData(genres);
        return genres[index];
    }

    async delete(id) {
        let genres = await this.readData();
        const newgenres = genres.filter(genre => genre.id !== id);
        if (newgenres.length === genres.length) return null;

        await this.writeData(newgenres);
        return true;
    }
}

export default new genreRepository();
