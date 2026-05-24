import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/InvoiceItem.entity";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    const invoice = new Invoice({
        id: new Id("1"),
        name: "Invoice 1",
        document: "123456789",
        address: {
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
        } as Address,
        items: [
            {
                id: new Id("1"),
                name: "Item 1",
                price: 100,
            } as InvoiceItem,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceItemModel, InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an invoice", async () => {
        const repository = new InvoiceRepository();
        const result = await repository.generate(invoice);

        expect(result.id).toBe(invoice.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items).toEqual(invoice.items);
        expect(result.createdAt).toEqual(invoice.createdAt);
        expect(result.updatedAt).toEqual(invoice.updatedAt);
    });

    it("should find an invoice", async () => {
        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const result = await repository.find(invoice.id.id);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items.at(0).name).toEqual(invoice.items.at(0).name);
        expect(result.items.at(0).price).toEqual(invoice.items.at(0).price);
    });
});
