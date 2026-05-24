import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/InvoiceItem.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Id from "../../../@shared/domain/value-object/id.value-object";
import {
    GenerateInvoiceInputDto,
    GenerateInvoiceOutputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
    private _invoiceGateway: InvoiceGateway;

    constructor(invoiceGateway: InvoiceGateway) {
        this._invoiceGateway = invoiceGateway;
    }

    async execute(
        input: GenerateInvoiceInputDto,
    ): Promise<GenerateInvoiceOutputDto> {
        const props = {
            name: input.name,
            document: input.document,
            address: input.address,
            items: input.items.map((item) => new InvoiceItem({
                id: item.id ? new Id(item.id) : new Id(),
                name: item.name,
                price: item.price,
            })),
        };

        const invoice = new Invoice(props);
        const persistedInvoice = await this._invoiceGateway.generate(invoice);

        return {
            id: persistedInvoice.id.id,
            name: persistedInvoice.name,
            document: persistedInvoice.document,
            address: persistedInvoice.address,
            items: persistedInvoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            createdAt: persistedInvoice.createdAt,
            updatedAt: persistedInvoice.updatedAt,
        };
    }
}
