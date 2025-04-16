import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import followRepository from "../repositories/follow.repository.js";

class followService {
    async createfollow(followData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await followRepository.create(followData);
        } catch (error) {
            throw new Error('Error creating follow');
        }
    }

    async getallfollow() {
        const follow = await followRepository.findAll();
        if (!follow || follow.length === 0) {
            throw new NotFoundError("No follows found.");
        }
        return follow;
    }

    async getfollowbyid(id) {
        const follow = await followRepository.findById(id);
        if (!follow) {
            throw new NotFoundError(`follow with ID ${id} not found.`);
        }
        return follow;
    }

    async updatefollow(id, followData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!followData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this follow.");
        }

        const updatedfollow = await followRepository.update(id, followData);
        if (!updatedfollow) {
            throw new NotFoundError(`follow with ID ${id} not found.`);
        }
        return updatedfollow;
    }

    async deletefollow(id) {
        const deleted = await followRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`follow with ID ${id} not found.`);
        }
        return { message: "follow deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new followService();
