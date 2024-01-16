import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const UpdateProductService = {
    async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const product = await ProductRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new AppError('Product not found.');
        }

        const productsExists = await ProductRepository.findByName(name);

        if (productsExists && name !== product.name) {
            throw new AppError('There is already one product with this name');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await ProductRepository.save(product);

        return product;
    },
};

export default UpdateProductService;
