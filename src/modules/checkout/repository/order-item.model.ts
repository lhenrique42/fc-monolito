import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { OrderModel } from "./order.model";
import ProductOrderModel from "./product.model";

@Table({
    tableName: "orders_items",
    timestamps: false,
})
export class OrderItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    order_id: string;

    @BelongsTo(() => OrderModel)
    order: OrderModel;

    @ForeignKey(() => ProductOrderModel)
    @Column({ allowNull: false })
    product_id: string;

    @BelongsTo(() => ProductOrderModel)
    product: ProductOrderModel;

    @Column({ allowNull: false })
    price: number;
}
