import request from "supertest";
import { app, sequelize } from "../server";
import { migrator } from "../db/sequelize/migrator";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.drop();
        await migrator(sequelize).up();
    });

    afterAll(async () => {
        await migrator(sequelize).down();
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
            .post("/api/clients")
            .send({
                name: "Client 1",
                email: "client1@example.com",
                document: "123456789",
                address: {
                    street: "Street 1",
                    number: "123",
                    complement: "Complement 1",
                    city: "City 1",
                    state: "State 1",
                    zipCode: "12345-678",
                },
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("client1@example.com");
    });
});
