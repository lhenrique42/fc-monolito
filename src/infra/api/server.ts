import express, { Application } from "express";
import { clientsRouter } from "./routes/client.route";
import { productsRouter } from "./routes/product.route";
import { invoicesRouter } from "./routes/invoice.route";
import { checkoutRouter } from "./routes/checkout.route";
import { Sequelize } from "sequelize-typescript";

import { OrderItemModel } from "../../modules/checkout/repository/order-item.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import ProductOrderModel from "../../modules/checkout/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import InvoiceItemsModel from "../../modules/invoice/repository/invoice-item.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductStoreCatalogModel from "../../modules/store-catalog/repository/product.model";
import { ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import { ClientOrderModel } from "../../modules/checkout/repository/client.model";

export const app: Application = express();
const PORT = 3333;

app.use(express.json());

app.use("/api/clients", clientsRouter);
app.use("/api/products", productsRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/checkout", checkoutRouter);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    sequelize.addModels([
        ProductAdmModel,
        ProductStoreCatalogModel,
        ProductOrderModel,
        ClientModel,
        OrderModel,
        OrderItemModel,
        ClientOrderModel,
        TransactionModel,
        InvoiceModel,
        InvoiceItemsModel,
    ]);
    if (process.env.NODE_ENV !== "test") {
        await sequelize.sync();
    }
}
setupDb();

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
