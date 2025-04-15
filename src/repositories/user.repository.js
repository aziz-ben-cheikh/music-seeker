import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/user.json");

class userRepository {
    async readData() {
        try {
            const data = await fs.readJson(filePath);
            return data.user || [];
        } catch {
            return [];
        }
    }

    async writeData(user) {
        await fs.writeJson(filePath, { user }, { spaces: 2 });
    }

    async create(newuser) {
        const users = await this.readData();
        newuser.id = Date.now().toString();
        users.push(newuser);
        await this.writeData(users);
        return newuser;
    }

    async findAll() {
        return await this.readData();
    }

    async findById(id) {
        const users = await this.readData();
        return users.find(user => user.id === id);
    }

    async update(id, userData) {
        let users = await this.readData();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...userData };
        await this.writeData(users);
        return users[index];
    }

    async delete(id) {
        let users = await this.readData();
        const newusers = users.filter(user => user.id !== id);
        if (newusers.length === users.length) return null;

        await this.writeData(newusers);
        return true;
    }
}

export default new userRepository();
