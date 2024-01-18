import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

const SessionsController = {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user = await CreateSessionsService.execute({
                email,
                password,
            });

            return res.json(user);
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default SessionsController;
