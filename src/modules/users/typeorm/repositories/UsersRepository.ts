import User from '../entities/User';
import { AppDataSource } from '@shared/typeorm';

export const UserRepository = AppDataSource.getRepository(User).extend({
    findByName(name: string): Promise<User | null> {
        const product = UserRepository.findOne({ where: { name } });
        return product;
    },

    findById(id: string): Promise<User | null> {
        const user = UserRepository.findOne({ where: { id } });
        return user;
    },

    findByEmail(email: string): Promise<User | null> {
        const user = UserRepository.findOne({ where: { email } });
        return user;
    },
});
