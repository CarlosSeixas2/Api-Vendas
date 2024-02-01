import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IRequest {
    id: string;
}

const ShowOrderService = {
    async execute({ id }: IRequest): Promise<Order> {
        const order = await OrdersRepository.findById(id);

        if (!order) {
            throw new AppError('Could not find any order with the given id');
        }

        return order;
    },
};

export default ShowOrderService;
