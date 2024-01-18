import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

const UsersController = {
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const users = await ListUserService.execute();

            return res.json(users);
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, avatar } = req.body;

            const user = await CreateUserService.execute({
                name,
                email,
                password,
                avatar,
            });

            return res.json(user);
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default UsersController;
