import Customer from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
    from: number;
    to: number;
    perPage: number;
    total: number;
    currentPage: number;
    prevPage: number | null;
    nextPage: number | null;
    data: Customer[];
}

const ListCustomerService = {
    async execute(): Promise<IPaginateCustomer> {
        const page = 1;
        const limit = 10;

        const [result, total] = await CustomersRepository.createQueryBuilder()
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            from: (page - 1) * limit + 1,
            to: page * limit,
            perPage: limit,
            total,
            currentPage: page,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: total > page * limit ? page + 1 : null,
            data: result,
        };
    },
};

export default ListCustomerService;
