import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js';
import { allowedRoles } from '../roles.js';
import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class userService {
    async createuser(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = {
                ...userData,
                password_hash: hashedPassword,
                roles: userData.roles || "user",
            };
            return await userRepository.create(newUser);
        } catch (error) {
            throw new Error("error creating user");
        }
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password");
        }
        
        const JWT_SECRET='your_jwt_secret'

        const token = jwt.sign(
            { userId: user.id, email: user.email, roles:user.roles},
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token, user: { id: user.id, username: user.username, email: user.email,roles: user.roles } };
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
