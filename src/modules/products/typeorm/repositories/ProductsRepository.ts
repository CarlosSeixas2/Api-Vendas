import { In } from 'typeorm';
import Product from '../entities/Product';
import { AppDataSource } from '@shared/typeorm';

interface IFindProducts {
    id: string;
}

export const ProductRepository = AppDataSource.getRepository(Product).extend({
    findByName(name: string): Promise<Product | null> {
        const product = ProductRepository.findOne({ where: { name } });
        return product;
    },
    findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(products => products.id);

        const existsProducts = ProductRepository.find({
            where: { id: In(productsIds) },
        });

        return existsProducts;
    },
});

// ! para usar tenho que arrumar o controller e nos services
// import { Repository } from 'typeorm';
// import Product from '../entities/Product';

// export class UserRepository extends Repository<Product> {
//     async findByName(name: string): Promise<Product | null> {
//         const product = await this.findOne({ where: { name } });
//         return product;
//     }
// }
