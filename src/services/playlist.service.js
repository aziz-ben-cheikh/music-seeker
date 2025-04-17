import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import playlistRepository from "../repositories/playlist.repository.js";

class playlistService {
    async createplaylist(playlistData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await playlistRepository.create(playlistData);
        } catch (error) {
            throw new Error('Error creating playlist');
        }
    }

    async getallplaylist() {
        const playlists = await playlistRepository.findAll();
        if (!playlists || playlists.length === 0) {
            throw new NotFoundError("No playlists found.");
        }
        return playlists;
    }

    async getplaylistbyid(id) {
        const playlist = await playlistRepository.findByid(id);
        if (!playlist) {
            throw new NotFoundError(`playlist with ID ${id} not found.`);
        }
        return playlist;
    }

    async updateplaylist(id, playlistData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!playlistData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this playlist.");
        }

        const updatedplaylist = await playlistRepository.update(id, playlistData);
        if (!updatedplaylist) {
            throw new NotFoundError(`playlist with ID ${id} not found.`);
        }
        return updatedplaylist;
    }

    async deleteplaylist(id) {
        const deleted = await playlistRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`playlist with ID ${id} not found.`);
        }
        return { message: "playlist deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new playlistService();
