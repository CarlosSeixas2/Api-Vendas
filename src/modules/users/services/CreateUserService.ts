import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

const CreateUserService = {
    async execute({ name, email, password }: IRequest): Promise<User> {
        const emailExists = await UserRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const user = UserRepository.create({
            name,
            email,
            password,
        });

        await UserRepository.save(user);

        return user;
    },
};

export default CreateUserService;
