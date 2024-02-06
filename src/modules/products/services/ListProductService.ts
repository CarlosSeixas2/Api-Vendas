import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

const ListProductService = {
    async execute(): Promise<Product[]> {
        let products = await RedisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST',
        );

        if (!products) {
            products = await ProductRepository.find();
            await RedisCache.save('api-vendas-PRODUCT_LIST', products);
        }

        return products;
    },
};

export default ListProductService;
