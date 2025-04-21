import userService from "../services/user.service.js";
import { NotFoundError, ForbiddenError, UnauthorizedError } from '../errors.js'; 


class userController {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email,password)
            const result = await userService.login(email, password);
            res.json(result);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({error:"login failed"});
            }
        }
    }
    

    async createuser(req, res) {
        try {
            const user = await userService.createuser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
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
            if (error instanceof NotFoundError) {
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
            if (error instanceof NotFoundError) {
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
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else if (error instanceof UnauthorizedError) {
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
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

export default new userController();
