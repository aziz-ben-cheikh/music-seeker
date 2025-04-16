import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import playlist_musicRepository from "../repositories/playlist_music.repository.js";

class playlist_musicService {
    async createplaylist_music(playlist_musicData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await playlist_musicRepository.create(playlist_musicData);
        } catch (error) {
            throw new Error('Error creating playlist_music');
        }
    }

    async getallplaylist_music() {
        const playlist_musics = await playlist_musicRepository.findAll();
        if (!playlist_musics || playlist_musics.length === 0) {
            throw new NotFoundError("No playlist_musics found.");
        }
        return playlist_musics;
    }

    async getplaylist_musicbyid(id) {
        const playlist_music = await playlist_musicRepository.findbyid(id);
        if (!playlist_music) {
            throw new NotFoundError(`playlist_music with ID ${id} not found.`);
        }
        return playlist_music;
    }

    async updateplaylist_music(id, playlist_musicData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!playlist_musicData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this playlist_music.");
        }

        const updatedplaylist_music = await playlist_musicRepository.update(id, playlist_musicData);
        if (!updatedplaylist_music) {
            throw new NotFoundError(`playlist_music with ID ${id} not found.`);
        }
        return updatedplaylist_music;
    }

    async deleteplaylist_music(id) {
        const deleted = await playlist_musicRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`playlist_music with ID ${id} not found.`);
        }
        return { message: "playlist_music deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new playlist_musicService();
