import fs from "fs-extra/esm";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../DataBase.js";



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
        const sql=`insert into follows (follower_id,following_id)
        values (?,?)`;
        const values=[
            newFollow.follower_id,
            newFollow.following_id,
        ];
        const [result] = await db.execute(sql, values);
        return { id: result.insertId, ...newFollow };
    }

    async findAll() {
        const sql = 'select * from follows';
        const  [result] = await db.execute(sql);
        return result;
    }

    async findByid(id) {
        const sql = 'SELECT * FROM follows WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
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
        const sql = 'DELETE FROM follows WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;

    }
}

export default new FollowRepository();
