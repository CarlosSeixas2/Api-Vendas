import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddCustomerIdToOrders1706699445182 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersCustomer', //nome da relação
                columnNames: ['customer_id'], //atributo na tabela orders
                referencedTableName: 'customers', //tabela referenciada
                referencedColumnNames: ['id'], //atributo da tabela referenciada para referencia
                onDelete: 'SET NULL', //o que acontece com os pedidos se o cliente for deletado
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
        await queryRunner.dropColumn('orders', 'customer_id');
    }
}
