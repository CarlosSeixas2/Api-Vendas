import { AppDataSource } from '@shared/typeorm';
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customers';

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

export const OrdersRepository = AppDataSource.getRepository(Order).extend({
    findById(id: string): Promise<Order | null> {
        const order = OrdersRepository.findOne({
            where: { id },
            relations: ['order_products', 'customer'],
        });
        return order;
    },

    async createOrder({ customer, products }: IRequest): Promise<Order> {
        const order = OrdersRepository.create({
            customer,
            order_products: products,
        });

        await OrdersRepository.save(order);

        return order;
    },
});
