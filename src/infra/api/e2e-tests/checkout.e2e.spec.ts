import request from "supertest";
import { app, sequelize } from "../server";
import { migrator } from "../db/sequelize/migrator";

describe("E2E test for checkout", () => {
    beforeEach(async () => {
        await sequelize.drop();
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("should place an order", async () => {
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
        expect(clientCreated.status).toBe(201);

        const inputProduct = {
            id: "123",
            name: "Product 1",
            description: "Description of Product 1",
            purchasePrice: 80,
            stock: 20,
        };
        const productCreate = await request(app)
            .post("/api/products")
            .send(inputProduct);
        expect(productCreate.status).toBe(201);

        const inputProduct2 = {
            id: "124",
            name: "Product 2",
            description: "Description of Product 2",
            purchasePrice: 160,
            stock: 20,
        };
        const productCreate2 = await request(app)
            .post("/api/products")
            .send(inputProduct2);
        expect(productCreate2.status).toBe(201);

        const response = await request(app)
            .post("/api/checkout")
            .send({
                clientId: clientCreated.body.id,
                products: [
                    {
                        productId: productCreate.body.id,
                    },
                    {
                        productId: productCreate2.body.id,
                    },
                ],
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe("approved");
        expect(response.body.total).toBe(300);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].productId).toBe(productCreate.body.id);
        expect(response.body.products[1].productId).toBe(
            productCreate2.body.id,
        );
    });
});
