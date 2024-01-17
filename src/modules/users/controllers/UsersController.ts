import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

const UsersController = {
    async index(req: Request, res: Response): Promise<Response> {
        const users = await ListUserService.execute();

        return res.json(users);
    },

    async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const user = CreateUserService.execute({
            name,
            email,
            password,
        });

        return res.json(user);
    },
};

export default UsersController;
