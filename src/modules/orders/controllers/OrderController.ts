import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

const OrderController = {
    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const order = await ShowOrderService.execute({ id });

        return res.json(order);
    },

    async create(req: Request, res: Response): Promise<Response> {
        const { customer_id, products } = req.body;

        const order = await CreateOrderService.execute({
            customer_id,
            products,
        });

        return res.json(order);
    },
};

export default OrderController;
