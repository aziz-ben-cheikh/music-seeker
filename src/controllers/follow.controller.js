import followService from "../services/follow.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; // Import error classes

class followController {

    async createfollow(req, res) {
        try {
            const follow = await followService.createfollow(req.body);
            res.status(201).json(follow);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async getallfollow(req, res) {
        try {
            const follows = await followService.getallfollow();
            res.json(follows);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getfollowbyid(req, res) {
        try {
            const follow = await followService.getfollowbyid(req.params.id);
            res.json(follow);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updatefollow(req, res) {
        try {
            const updatedfollow = await followService.updatefollow(req.params.id, req.body);
            res.json(updatedfollow);
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

    async deletefollow(req, res) {
        try {
            const result = await followService.deletefollow(req.params.id);
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

export default new followController();
