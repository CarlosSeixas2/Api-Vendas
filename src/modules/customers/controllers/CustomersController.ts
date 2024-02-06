import { Request, Response } from 'express';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

const CustomersController = {
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const customers = await ListCustomerService.execute();

            return res.json(customers);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const customer = await ShowCustomerService.execute({ id });

        return res.json(customer);
    },

    async create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;

        const customer = await CreateCustomerService.execute({
            name,
            email,
        });

        return res.json(customer);
    },

    async update(req: Request, res: Response): Promise<Response> {
        const { id, name, email } = req.body;

        const customer = await UpdateCustomerService.execute({
            id,
            name,
            email,
        });

        return res.json(customer);
    },

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        await DeleteCustomerService.execute({ id });

        return res.json([]);
    },
};

export default CustomersController;
