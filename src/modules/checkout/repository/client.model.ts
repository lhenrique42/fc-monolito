import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: "client-order",
    tableName: "checkout_clients", // Use um nome de tabela específico se desejar
    timestamps: false,
})
export class ClientOrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    email: string;
}
