import { AppDataSource } from '@shared/typeorm';
import Customer from '../entities/Customers';

export const CustomersRepository = AppDataSource.getRepository(Customer).extend(
    {
        findByName(name: string): Promise<Customer | null> {
            const customer = CustomersRepository.findOne({ where: { name } });
            return customer;
        },

        findById(id: string): Promise<Customer | null> {
            const customer = CustomersRepository.findOne({ where: { id } });
            return customer;
        },

        findByEmail(email: string): Promise<Customer | null> {
            const customer = CustomersRepository.findOne({ where: { email } });
            return customer;
        },
    },
);
