import AppError from '@shared/errors/AppError';
import { UserTokenRepository } from './../typeorm/repositories/UsersTokenRepository';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

const ResetPasswordService = {
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await UserTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists.');
        }

        const user = await UserRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        user.password = await hash(password, 8);

        await UserRepository.save(user);
    },
};

export default ResetPasswordService;
