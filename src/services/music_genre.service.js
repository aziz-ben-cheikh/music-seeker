import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 
import music_genreRepository from "../repositories/music_genre.repository.js";

class music_genreService {
    async createmusic_genre(music_genreData) {
        try {
            // Check for any validation or authentication logic here (if needed)
            return await music_genreRepository.create(music_genreData);
        } catch (error) {
            throw new Error('Error creating music_genre');
        }
    }

    async getallmusic_genre() {
        const music_genres = await music_genreRepository.findAll();
        if (!music_genres || music_genres.length === 0) {
            throw new NotFoundError("No music_genres found.");
        }
        return music_genres;
    }

    async getmusic_genrebyid(id) {
        const music_genre = await music_genreRepository.findbyid(id);
        if (!music_genre) {
            throw new NotFoundError(`music_genre with ID ${id} not found.`);
        }
        return music_genre;
    }

    async updatemusic_genre(id, music_genreData) {
        // Example of checking for unauthorized access (you can modify based on your authentication logic)
        if (!music_genreData.isAuthorized) {
            throw new UnauthorizedError("You are not authorized to update this music_genre.");
        }

        const updatedmusic_genre = await music_genreRepository.update(id, music_genreData);
        if (!updatedmusic_genre) {
            throw new NotFoundError(`music_genre with ID ${id} not found.`);
        }
        return updatedmusic_genre;
    }

    async deletemusic_genre(id) {
        const deleted = await music_genreRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`music_genre with ID ${id} not found.`);
        }
        return { message: "music_genre deleted successfully." };
    }

    // You can add additional methods like login, etc., with 401/403 error handling based on the case
}

export default new music_genreService();
