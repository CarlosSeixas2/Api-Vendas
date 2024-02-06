import AppError from '@shared/errors/AppError';
// import { hash } from 'bcryptjs';
import Customer from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

const CreateCustomerService = {
    async execute({ name, email }: IRequest): Promise<Customer> {
        const emailExists = await CustomersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const customer = await CustomersRepository.create({
            name,
            email,
        });

        await CustomersRepository.save(customer);

        return customer;
    },
};

export default CreateCustomerService;
