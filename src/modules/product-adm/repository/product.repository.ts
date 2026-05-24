import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductAdmModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductAdmModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            salesPrice: product.purchasePrice * 1.25,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    async find(id: string): Promise<Product> {
        const product = await ProductAdmModel.findOne({
            where: { id },
        });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }
}
