import AppError from '@shared/errors/AppError';
import { UserTokenRepository } from './../typeorm/repositories/UsersTokenRepository';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    email: string;
}

const SendForgotPasswordEmailService = {
    async execute({ email }: IRequest): Promise<void> {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        // console.log(user);

        const token = await UserTokenRepository.generate(user.id);

        // console.log(token);
    },
};

export default SendForgotPasswordEmailService;
