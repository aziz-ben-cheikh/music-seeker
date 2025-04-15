import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";


// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/follow.json");

class FollowRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.follow || [];
        } catch {
            return [];
        }
    }

    async writeData(follow) {
        await fs.writeJson(filePath, { follow }, { spaces: 2 });
    }

    async create(newFollow) {
        const follows = await this.readData();
        newFollow.id = Date.now().toString();
        follows.push(newFollow);
        await this.writeData(follows);
        return newFollow;
    }

    async findAll() {
        return await this.readData();
    }

    async findById(id) {
        const follows = await this.readData();
        return follows.find(follow => follow.id === id);
    }

    async update(id, followData) {
        let follows = await this.readData();
        const index = follows.findIndex(follow => follow.id === id);
        if (index === -1) return null;

        follows[index] = { ...follows[index], ...followData };
        await this.writeData(follows);
        return follows[index];
    }

    async delete(id) {
        let follows = await this.readData();
        const newFollows = follows.filter(follow => follow.id !== id);
        if (newFollows.length === follows.length) return null;

        await this.writeData(newFollows);
        return true;
    }
}

export default new FollowRepository();
