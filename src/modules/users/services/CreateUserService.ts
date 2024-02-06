import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

const CreateProductService = {
    async execute({ name, email, password }: IRequest): Promise<User> {
        const emailExists = await UserRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const encryptedPassword = await hash(password, 12);

        const user = await UserRepository.create({
            name,
            email,
            password: encryptedPassword,
        });

        await UserRepository.save(user);

        return user;
    },
};

export default CreateProductService;
