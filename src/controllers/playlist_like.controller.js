import playlist_likeService from "../services/playlist_like.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from "../errors.js";

class playlist_likeController {
  async createplaylist_like(req, res) {
    try {
      const playlist_like = await playlist_likeService.createplaylist_like(
        req.body
      );
      res.status(201).json(playlist_like);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 401) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async getallplaylist_like(req, res) {
    try {
      const playlist_likes = await playlist_likeService.getallplaylist_like();
      res.json(playlist_likes);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getplaylist_likebyid(req, res) {
    try {
      const playlist_like = await playlist_likeService.getplaylist_likebyid(
        req.params.id
      );
      res.json(playlist_like);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async updateplaylist_like(req, res) {
    try {
      const updatedplaylist_like =
        await playlist_likeService.updateplaylist_like(req.params.id, req.body);
      res.json(updatedplaylist_like);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else if (error.name === "appError" && error.statuscode === 401) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async deleteplaylist_like(req, res) {
    try {
      const result = await playlist_likeService.deleteplaylist_like(
        req.params.id
      );
      res.json(result);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new playlist_likeController();
