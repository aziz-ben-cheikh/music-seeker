import likeService from "../services/like.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 

class likeController {

    async createlike(req, res) {
        try {
            const like = await likeService.createlike(req.body);
            res.status(201).json(like);
        } catch (error) {
            if (error.name === 'appError' && error.statuscode === 401) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async getalllike(req, res) {
        try {
            const likes = await likeService.getalllike();
            res.json(likes);
        } catch (error) {
            if (error.name === 'appError' && error.statuscode === 404) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getlikebyid(req, res) {
        try {
            const like = await likeService.getlikebyid(req.params.id);
            res.json(like);
        } catch (error) {
            if (error.name === 'appError' && error.statuscode === 404) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updatelike(req, res) {
        try {
            const updatedlike = await likeService.updatelike(req.params.id, req.body);
            res.json(updatedlike);
        } catch (error) {
            if (error.name === 'appError' && error.statuscode === 404) {
                res.status(404).json({ error: error.message });
            } else if (error.name === 'appError' && error.statuscode === 401) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async deletelike(req, res) {
        try {
            const result = await likeService.deletelike(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.name === 'appError' && error.statuscode === 404) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new likeController();
