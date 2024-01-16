import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

const ListUserService = {
    async execute({ name, email, password }: IRequest): Promise<User[]> {
        const users = await UserRepository.find();

        return users;
    },
};

export default ListUserService;
