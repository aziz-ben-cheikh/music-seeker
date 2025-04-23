import musicService from "../services/music.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from "../errors.js";

class musicController {
  async createmusic(req, res) {
    try {
      const music = await musicService.createmusic(req.body);
      res.status(201).json(music);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 401) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async getallmusic(req, res) {
    try {
      const musics = await musicService.getallmusic();
      res.json(musics);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getmusicbyid(req, res) {
    try {
      const music = await musicService.getmusicbyid(req.params.id);
      res.json(music);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async updatemusic(req, res) {
    try {
      const updatedmusic = await musicService.updatemusic(
        req.params.id,
        req.body
      );
      res.json(updatedmusic);
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

  async deletemusic(req, res) {
    try {
      const result = await musicService.deletemusic(req.params.id);
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

export default new musicController();
