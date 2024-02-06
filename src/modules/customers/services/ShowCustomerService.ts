import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

const ShowCustomerService = {
    async execute({ id }: IRequest): Promise<Customer> {
        const customer = await CustomersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    },
};

export default ShowCustomerService;
