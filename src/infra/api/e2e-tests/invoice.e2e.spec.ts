import request from "supertest";
import { app, sequelize } from "../server";
import { migrator } from "../db/sequelize/migrator";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../modules/invoice/repository/invoice-item.model";

describe("E2E test for invoice", () => {
    beforeEach(async () => {
        await sequelize.drop();
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("should fetch an invoice", async () => {
        // Seed expected invoice in DB
        await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "123456789",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await InvoiceItemModel.create({
            id: "1",
            name: "Item 1",
            price: 100,
            invoiceId: "1",
        });
        await InvoiceItemModel.create({
            id: "2",
            name: "Item 2",
            price: 200,
            invoiceId: "1",
        });

        const inputClient = {
            name: "John Doe",
            email: "john.doe@example.com",
            document: "1234567890",
            address: {
                street: "123 Main St",
                number: "123",
                complement: "Apt 1",
                city: "Anytown",
                state: "CA",
                zipCode: "12345",
            },
        };
        const clientCreated = await request(app)
            .post("/api/clients")
            .send(inputClient);

        const inputProduct = {
            id: "123",
            name: "Product 1",
            description: "Description of Product 1",
            purchasePrice: 80,
            stock: 20,
        };
        await request(app).post("/api/products").send(inputProduct);

        const checkoutInput = {
            clientId: clientCreated.body.id,
            products: [{ id: "123" }],
        };
        const checkoutResponse = await request(app)
            .post("/api/checkout")
            .send(checkoutInput);

        const response = await request(app).get("/api/invoices/1");

        expect(response.status).toBe(200);
        expect(response.body.id).toBe("1");
        expect(response.body.name).toBe("Invoice 1");
        expect(response.body.document).toBe("123456789");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe("123");
        expect(response.body.address.complement).toBe("Complement 1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.state).toBe("State 1");
        expect(response.body.address.zipCode).toBe("12345-678");
        expect(response.body.items.length).toBe(2);
        expect(response.body.items[0].name).toBe("Item 1");
        expect(response.body.items[0].price).toBe(100);
        expect(response.body.items[1].name).toBe("Item 2");
        expect(response.body.items[1].price).toBe(200);
    });
});
