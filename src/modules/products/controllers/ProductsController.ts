import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

const ProductsController = {
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const products = await ListProductService.execute();

            return res.json(products);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const product = await ShowProductService.execute({ id });

        return res.json(product);
    },

    async create(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;

        const product = await CreateProductService.execute({
            name,
            price,
            quantity,
        });

        return res.json(product);
    },

    async update(req: Request, res: Response): Promise<Response> {
        const { id, name, price, quantity } = req.body;

        const product = await UpdateProductService.execute({
            id,
            name,
            price,
            quantity,
        });

        return res.json(product);
    },

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        await DeleteProductService.execute({ id });

        return res.json([]);
    },
};

export default ProductsController;
