import { Model } from "sequelize-typescript";
import {
    BelongsTo,
    Column,
    ForeignKey,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_items",
    timestamps: false,
})
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id!: string;

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    price!: number;

    @ForeignKey(() => InvoiceModel)
    @Column({
        allowNull: false,
        field: "invoice_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    invoiceId!: string;

    @BelongsTo(() => InvoiceModel)
    invoice!: InvoiceModel;
}
