import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import userRepository from "../repositories/user.repository.js";

class userService {
    async createuser(userData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await userRepository.create(userData);
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    async getalluser() {
        const users = await userRepository.findAll();
        if (!users || users.length === 0) {
            throw new NotFoundError("No users found.");
        }
        return users;
    }

    async getuserbyid(id) {
        const user = await userRepository.findByid(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found.`);
        }
        return user;
    }

    async updateuser(id, userData) {
        const updatedUser = await userRepository.update(id, userData);
        if (!updatedUser) {
            throw new NotFoundError(`User with ID ${id} not found.`);
        }
        return updatedUser;
    }

    async deleteuser(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`User with ID ${id} not found.`);
        }
        return { message: "User deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new userService();
