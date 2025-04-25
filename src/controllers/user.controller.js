import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { NotFoundError, ForbiddenError, UnauthorizedError } from "../errors.js";

const JWT_SECRET = "your_jwt_secret";

class userController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const result = await userService.login(email, password);
      res.json(result);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 401) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "login failed" });
      }
    }
  }

  async refreshAccessToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
  
      if (!refreshToken) {
        throw UnauthorizedError("Refresh token required");
      }
  
      const payload = jwt.verify(refreshToken, JWT_SECRET);
  
      const newAccessToken = jwt.sign(
        { userId: payload.userId },
        JWT_SECRET,
        { expiresIn: "15m" }
      );
  
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        next(ForbiddenError("Invalid or expired refresh token"));
      } else if (error.name === "appError") {
        next(error);
      } else {
        next(new Error("Something went wrong"));
      }
    }
  }

  async createuser(req, res) {
    try {
      const user = await userService.createuser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 401) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async getalluser(req, res) {
    try {
      const users = await userService.getalluser();
      res.json(users);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getuserbyid(req, res) {
    try {
      const user = await userService.getuserbyid(req.params.id);
      res.json(user);
    } catch (error) {
      if (error.name === "appError" && error.statuscode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async updateuser(req, res) {
    try {
      const updateduser = await userService.updateuser(req.params.id, req.body);
      res.json(updateduser);
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

  async deleteuser(req, res) {
    try {
      const result = await userService.deleteuser(req.params.id);
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

export default new userController();
