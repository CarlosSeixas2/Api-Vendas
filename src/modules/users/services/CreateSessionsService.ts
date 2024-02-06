import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

const CreateSessionsService = {
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.secret, {
            subject: user.id,
            expiresIn: authConfig.expiresIn,
        });

        return { user, token };
    },
};

export default CreateSessionsService;
