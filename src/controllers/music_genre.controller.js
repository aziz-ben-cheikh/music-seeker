import music_genreService from "../services/music_genre.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; // Import error classes

class music_genreController {

    async createmusic_genre(req, res) {
        try {
            const music_genre = await music_genreService.createmusic_genre(req.body);
            res.status(201).json(music_genre);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async getallmusic_genre(req, res) {
        try {
            const music_genres = await music_genreService.getallmusic_genre();
            res.json(music_genres);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getmusic_genrebyid(req, res) {
        try {
            const music_genre = await music_genreService.getmusic_genrebyid(req.params.id);
            res.json(music_genre);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updatemusic_genre(req, res) {
        try {
            const updatedmusic_genre = await music_genreService.updatemusic_genre(req.params.id, req.body);
            res.json(updatedmusic_genre);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else if (error instanceof UnauthorizedError) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async deletemusic_genre(req, res) {
        try {
            const result = await music_genreService.deletemusic_genre(req.params.id);
            res.json(result);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new music_genreController();
