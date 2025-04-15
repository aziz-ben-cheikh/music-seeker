import genreService from "../services/genre.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; // Import error classes

class genreController {

    async creategenre(req, res) {
        try {
            const genre = await genreService.creategenre(req.body);
            res.status(201).json(genre);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async getallgenre(req, res) {
        try {
            const genres = await genreService.getallgenre();
            res.json(genres);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getgenrebyid(req, res) {
        try {
            const genre = await genreService.getgenrebyid(req.params.id);
            res.json(genre);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updategenre(req, res) {
        try {
            const updatedgenre = await genreService.updategenre(req.params.id, req.body);
            res.json(updatedgenre);
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

    async deletegenre(req, res) {
        try {
            const result = await genreService.deletegenre(req.params.id);
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

export default new genreController();
