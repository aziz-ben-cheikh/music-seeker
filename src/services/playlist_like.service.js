import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import playlist_likeRepository from "../repositories/playlist_like.repository.js";

class playlist_likeService {
    async createplaylist_like(playlist_likeData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await playlist_likeRepository.create(playlist_likeData);
        } catch (error) {
            throw new Error('Error creating playlist_like');
        }
    }

    async getallplaylist_like() {
        const playlist_likes = await playlist_likeRepository.findAll();
        if (!playlist_likes || playlist_likes.length === 0) {
            throw new NotFoundError("No playlist_likes found.");
        }
        return playlist_likes;
    }

    async getplaylist_likebyid(id) {
        const playlist_like = await playlist_likeRepository.findbyid(id);
        if (!playlist_like) {
            throw new NotFoundError(`playlist_like with ID ${id} not found.`);
        }
        return playlist_like;
    }

    async updateplaylist_like(id, playlist_likeData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!playlist_likeData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this playlist_like.");
        }

        const updatedplaylist_like = await playlist_likeRepository.update(id, playlist_likeData);
        if (!updatedplaylist_like) {
            throw new NotFoundError(`playlist_like with ID ${id} not found.`);
        }
        return updatedplaylist_like;
    }

    async deleteplaylist_like(id) {
        const deleted = await playlist_likeRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`playlist_like with ID ${id} not found.`);
        }
        return { message: "playlist_like deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new playlist_likeService();
