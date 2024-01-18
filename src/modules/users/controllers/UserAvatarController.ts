import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const UserAvatarController = {
    async update(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.file) {
                throw new Error('Avatar file not provided.');
            }

            const user = await UpdateUserAvatarService.execute({
                user_id: req.user.id,
                avatarFilename: req.file.filename,
            });

            return res.json(user);
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default UserAvatarController;
