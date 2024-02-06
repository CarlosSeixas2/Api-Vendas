import { compare, hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

const UpdateCustomerService = {
    async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customer = await CustomersRepository.findById(id);

        if (!customer) {
            throw new AppError('customer not found.');
        }

        const CustomerUpdateEmail =
            await CustomersRepository.findByEmail(email);

        if (CustomerUpdateEmail && customer.email !== email) {
            throw new AppError(
                'There is already one customer with this email.',
            );
        }

        customer.name = name;
        customer.email = email;
        await CustomersRepository.save(customer);

        return customer;
    },
};

export default UpdateCustomerService;
