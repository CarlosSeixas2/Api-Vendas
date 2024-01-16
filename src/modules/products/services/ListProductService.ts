import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

export default class ListProductService {
    public async execute(): Promise<Product[]> {
        const products = await ProductRepository.find();

        return products;
    }
}
