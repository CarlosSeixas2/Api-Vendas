import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

const CreateProductService = {
    async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productsExists = await ProductRepository.findByName(name);

        if (productsExists) {
            throw new AppError('There is already one product with this name');
        }

        const product = await ProductRepository.create({
            name,
            price,
            quantity,
        });

        await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

        await ProductRepository.save(product);

        return product;
    },
};

export default CreateProductService;
