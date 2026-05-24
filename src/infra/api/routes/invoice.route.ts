import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export const invoicesRouter = express.Router();
const invoiceFacade = InvoiceFacadeFactory.create();

invoicesRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const invoice = await invoiceFacade.find({ id });
        if (invoice) {
            res.json(invoice);
        } else {
            res.status(404).json({ message: "Invoice not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching invoice", error });
    }
});
