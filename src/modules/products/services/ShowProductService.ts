import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

interface IRequest {
    id: string;
}

export default class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | null> {
        const product = await ProductRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}
