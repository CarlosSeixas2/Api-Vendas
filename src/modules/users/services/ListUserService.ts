import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

const ListUserService = {
    async execute(): Promise<User[]> {
        const users = await UserRepository.find();

        return users;
    },
};

export default ListUserService;
