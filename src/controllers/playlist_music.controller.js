import playlist_musicService from "../services/playlist_music.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from "../errors.js";

class playlist_musicController {
  async createplaylist_music(req, res) {
    try {
      const playlist_music = await playlist_musicService.createplaylist_music(
        req.body
      );
      res.status(201).json(playlist_music);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 401) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async getallplaylist_music(req, res) {
    try {
      const playlist_musics =
        await playlist_musicService.getallplaylist_music();
      res.json(playlist_musics);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getplaylist_musicbyid(req, res) {
    try {
      const playlist_music = await playlist_musicService.getplaylist_musicbyid(
        req.params.id
      );
      res.json(playlist_music);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async updateplaylist_music(req, res) {
    try {
      const updatedplaylist_music =
        await playlist_musicService.updateplaylist_music(
          req.params.id,
          req.body
        );
      res.json(updatedplaylist_music);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else if (error.name === "appError" && error.statuscode === 404) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async deleteplaylist_music(req, res) {
    try {
      const result = await playlist_musicService.deleteplaylist_music(
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

export default new playlist_musicController();
