import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRouter = express.Router();

const clientAdmFacade = ClientAdmFacadeFactory.create();

clientsRouter.post("/", async (req: Request, res: Response) => {
    const { name, email, document, address } = req.body;

    try {
        const client = await clientAdmFacade.add({
            name,
            email,
            document,
            address,
        });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: "Error creating client", error });
    }
});
