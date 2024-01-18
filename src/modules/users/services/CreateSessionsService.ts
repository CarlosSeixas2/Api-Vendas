import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

        const token = sign({}, '68930f748acf869d4d5375969fd0339f', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token };
    },
};

export default CreateSessionsService;
