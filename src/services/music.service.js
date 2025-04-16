import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import musicRepository from "../repositories/music.repository.js";

class musicService {
    async createmusic(musicData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await musicRepository.create(musicData);
        } catch (error) {
            throw new Error('Error creating music');
        }
    }

    async getallmusic() {
        const musics = await musicRepository.findAll();
        if (!musics || musics.length === 0) {
            throw new NotFoundError("No musics found.");
        }
        return musics;
    }

    async getmusicbyid(id) {
        const music = await musicRepository.findbyid(id);
        if (!music) {
            throw new NotFoundError(`music with ID ${id} not found.`);
        }
        return music;
    }

    async updatemusic(id, musicData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!musicData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this music.");
        }

        const updatedmusic = await musicRepository.update(id, musicData);
        if (!updatedmusic) {
            throw new NotFoundError(`music with ID ${id} not found.`);
        }
        return updatedmusic;
    }

    async deletemusic(id) {
        const deleted = await musicRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`music with ID ${id} not found.`);
        }
        return { message: "music deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new musicService();
