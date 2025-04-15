import playlistService from "../services/playlist.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; // Import error classes

class playlistController {

    async createplaylist(req, res) {
        try {
            const playlist = await playlistService.createplaylist(req.body);
            res.status(201).json(playlist);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async getallplaylist(req, res) {
        try {
            const playlists = await playlistService.getallplaylist();
            res.json(playlists);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getplaylistbyid(req, res) {
        try {
            const playlist = await playlistService.getplaylistbyid(req.params.id);
            res.json(playlist);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updateplaylist(req, res) {
        try {
            const updatedplaylist = await playlistService.updateplaylist(req.params.id, req.body);
            res.json(updatedplaylist);
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

    async deleteplaylist(req, res) {
        try {
            const result = await playlistService.deleteplaylist(req.params.id);
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

export default new playlistController();
