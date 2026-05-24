import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productsRouter = express.Router();
const productAdmFacade = ProductAdmFacadeFactory.create();

productsRouter.post("/", async (req: Request, res: Response) => {
    const { name, description, purchasePrice, stock } = req.body;

    try {
        const product = await productAdmFacade.addProduct({
            name,
            description,
            purchasePrice,
            stock,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
});
