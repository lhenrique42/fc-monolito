import InvoiceGateway from "../../gateway/invoice.gateway";
import {
    FindInvoiceInputDto,
    FindInvoiceOutputDto,
} from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {
    private _invoiceGateway: InvoiceGateway;

    constructor(invoiceGateway: InvoiceGateway) {
        this._invoiceGateway = invoiceGateway;
    }

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
        const result = await this._invoiceGateway.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };
    }
}
