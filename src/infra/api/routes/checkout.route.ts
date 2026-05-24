import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRouter = express.Router();
const checkoutFacade = CheckoutFacadeFactory.create();

checkoutRouter.post("/", async (req: Request, res: Response) => {
    const { clientId, products } = req.body;

    try {
        const order = await checkoutFacade.placeOrder({
            clientId,
            products,
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
});
