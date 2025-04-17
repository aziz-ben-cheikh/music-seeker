import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import genreRepository from "../repositories/genre.repository.js";

class genreService {
    async creategenre(genreData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await genreRepository.create(genreData);
        } catch (error) {
            throw new Error('Error creating genre');
        }
    }

    async getallgenre() {
        const genres = await genreRepository.findAll();
        if (!genres || genres.length === 0) {
            throw new NotFoundError("No genres found.");
        }
        return genres;
    }

    async getgenrebyid(id) {
        const genre = await genreRepository.findByid(id);
        if (!genre) {
            throw new NotFoundError(`genre with ID ${id} not found.`);
        }
        return genre;
    }

    async updategenre(id, genreData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!genreData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this genre.");
        }

        const updatedgenre = await genreRepository.update(id, genreData);
        if (!updatedgenre) {
            throw new NotFoundError(`genre with ID ${id} not found.`);
        }
        return updatedgenre;
    }

    async deletegenre(id) {
        const deleted = await genreRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`genre with ID ${id} not found.`);
        }
        return { message: "genre deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new genreService();
