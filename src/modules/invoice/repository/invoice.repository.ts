import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/InvoiceItem.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<Invoice> {
        await InvoiceModel.create(
            {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items: invoice.items.map((item) => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            },
            {
                include: [{ model: InvoiceItemModel }],
            },
        );
        return invoice;
    }

    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: { id },
            include: ["items"],
        });

        if (!invoiceModel) {
            throw new Error("Invoice not found");
        }

        const invoice = new Invoice({
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: {
                street: invoiceModel.street,
                number: invoiceModel.number,
                complement: invoiceModel.complement,
                city: invoiceModel.city,
                state: invoiceModel.state,
                zipCode: invoiceModel.zipCode,
            } as Address,
            items: invoiceModel.items.map((item) => {
                return new InvoiceItem({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                });
            }),
        });

        return invoice;
    }
}
