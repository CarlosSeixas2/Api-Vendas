import Product from '@modules/products/typeorm/entities/Product';
import Order from './Order';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('orders_products')
class OrdersProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column()
    product_id: string;

    @Column()
    order_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default OrdersProducts;
