import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

const ListProductService = {
    async execute(): Promise<Product[]> {
        const products = await ProductRepository.find();

        return products;
    },
};

export default ListProductService;
