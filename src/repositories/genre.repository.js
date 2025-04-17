import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";


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
        const sql = `insert into genre (name)
        VALUES (?)`;
        const VALUES=[newgenre.name,];
        const [result] = await db.execute(sql, VALUES);
        return { id: result.insertId, ...newgenre };


    }

    async findAll() {
        const sql = 'select * from genre';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM genre WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
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
        const sql = 'DELETE FROM genre WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new genreRepository();
