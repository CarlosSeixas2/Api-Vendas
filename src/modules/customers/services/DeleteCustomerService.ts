import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

const DeleteCustomerService = {
    async execute({ id }: IRequest): Promise<void> {
        const customer = await CustomersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        await CustomersRepository.remove(customer);
        return;
    },
};

export default DeleteCustomerService;
