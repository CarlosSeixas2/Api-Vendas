import Customer from '../typeorm/entities/customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

const ListCustomerService = {
    async execute(): Promise<Customer[]> {
        const customers = await CustomersRepository.find();

        return customers;
    },
};

export default ListCustomerService;
