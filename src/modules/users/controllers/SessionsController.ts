import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { instanceToPlain } from 'class-transformer';

const SessionsController = {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user = await CreateSessionsService.execute({
                email,
                password,
            });

            return res.json(instanceToPlain(user));
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default SessionsController;
