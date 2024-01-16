import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

interface IRequest {
    id: string;
}

const DeleteProductService = {
    async execute({ id }: IRequest): Promise<void> {
        const product = await ProductRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new AppError('Product not found.');
        }

        await ProductRepository.remove(product);
    },
};

export default DeleteProductService;
