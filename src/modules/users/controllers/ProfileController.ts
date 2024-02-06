import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { instanceToPlain } from 'class-transformer';

const ProfileController = {
    async show(req: Request, res: Response): Promise<Response> {
        try {
            const user_id = req.user.id;

            const users = await ShowProfileService.execute({ user_id });

            return res.json(instanceToPlain(users));
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, old_password } = req.body;
            const user_id = req.user.id;

            const user = await UpdateProfileService.execute({
                user_id,
                name,
                email,
                password,
                old_password,
            });

            return res.json(instanceToPlain(user));
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default ProfileController;
