import request from "supertest";
import { app, sequelize } from "../server";
import { migrator } from "../db/sequelize/migrator";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.drop();
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app).post("/api/products").send({
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10,
        });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Description 1");
        expect(response.body.purchasePrice).toBe(100);
        expect(response.body.stock).toBe(10);
    });
});
