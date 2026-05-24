import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import Address from "../../@shared/domain/value-object/address";
import InvoiceFacade from "./invoice.facade";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

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
        const generateUseCase = new GenerateInvoiceUseCase(repository);
        const findUseCase = new FindInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: findUseCase,
        });

        const address = new Address(
            "Street 1",
            "123",
            "Complement 1",
            "City 1",
            "State 1",
            "12345-678",
        );

        const input = {
            name: "Invoice 1",
            document: "123456789",
            address: address,
            items: [
                {
                    name: "Item 1",
                    price: 100,
                },
                {
                    name: "Item 2",
                    price: 200,
                },
            ],
        };

        const output = await facade.generate(input);

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.address.street).toBe(input.address.street);
        expect(output.address.number).toBe(input.address.number);
        expect(output.address.complement).toBe(input.address.complement);
        expect(output.address.city).toBe(input.address.city);
        expect(output.address.state).toBe(input.address.state);
        expect(output.address.zipCode).toBe(input.address.zipCode);
        expect(output.items.length).toBe(2);
        expect(output.items[0].id).toBeDefined();
        expect(output.items[0].name).toBe("Item 1");
        expect(output.items[0].price).toBe(100);
        expect(output.items[1].id).toBeDefined();
        expect(output.items[1].name).toBe("Item 2");
        expect(output.items[1].price).toBe(200);
        expect(output.total).toBe(300);
    });

    it("should find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const address = new Address(
            "Street 1",
            "123",
            "Complement 1",
            "City 1",
            "State 1",
            "12345-678",
        );

        const input = {
            name: "Invoice 1",
            document: "123456789",
            address: address,
            items: [
                {
                    name: "Item 1",
                    price: 100,
                },
            ],
        };

        const generated = await facade.generate(input);
        const output = await facade.find({ id: generated.id });

        expect(output.id).toBe(generated.id);
        expect(output.name).toBe(generated.name);
        expect(output.document).toBe(generated.document);
        expect(output.address.street).toBe(generated.address.street);
        expect(output.address.number).toBe(generated.address.number);
        expect(output.address.complement).toBe(generated.address.complement);
        expect(output.address.city).toBe(generated.address.city);
        expect(output.address.state).toBe(generated.address.state);
        expect(output.address.zipCode).toBe(generated.address.zipCode);
        expect(output.items.length).toBe(1);
        expect(output.items[0].id).toBeDefined();
        expect(output.items[0].name).toBe("Item 1");
        expect(output.items[0].price).toBe(100);
        expect(output.total).toBe(100);
    });
});
