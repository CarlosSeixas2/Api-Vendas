import Product from '../entities/Product';
import { AppDataSource } from '@shared/typeorm';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
    findByName(name: string): Promise<Product | null> {
        const product = ProductRepository.findOne({ where: { name } });
        return product;
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
