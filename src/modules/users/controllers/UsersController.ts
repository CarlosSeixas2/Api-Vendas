import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import { instanceToPlain } from 'class-transformer';

const UsersController = {
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const users = await ListUserService.execute();

            // console.log(req.user.id);

            return res.json(instanceToPlain(users));
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const user = await CreateUserService.execute({
                name,
                email,
                password,
            });

            // return res.json(user);
            return res.json(instanceToPlain(user));
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default UsersController;
