import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; // Import error classes
import likeRepository from "../repositories/like.repository.js";

class likeService {
    async createlike(likeData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await likeRepository.create(likeData);
        } catch (error) {
            throw new Error('Error creating like');
        }
    }

    async getalllike() {
        const likes = await likeRepository.findAll();
        if (!likes || likes.length === 0) {
            throw new NotFoundError("No likes found.");
        }
        return likes;
    }

    async getlikebyid(id) {
        const like = await likeRepository.findbyid(id);
        if (!like) {
            throw new NotFoundError(`like with ID ${id} not found.`);
        }
        return like;
    }

    async updatelike(id, likeData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!likeData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this like.");
        }

        const updatedlike = await likeRepository.update(id, likeData);
        if (!updatedlike) {
            throw new NotFoundError(`like with ID ${id} not found.`);
        }
        return updatedlike;
    }

    async deletelike(id) {
        const deleted = await likeRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`like with ID ${id} not found.`);
        }
        return { message: "like deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new likeService();
