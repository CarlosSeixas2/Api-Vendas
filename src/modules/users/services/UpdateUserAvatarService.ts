import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs/promises'; // Import fs.promises directly

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

const UpdateUserAvatarService = {
    async execute({
        user_id,
        avatarFilename,
    }: IRequest): Promise<User | undefined> {
        const user = await UserRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExists = await fs.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;

        await UserRepository.save(user);

        return user;
    },
};

export default UpdateUserAvatarService;
