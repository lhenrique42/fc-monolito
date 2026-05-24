import Address from "../../@shared/domain/value-object/address";

export interface GenerateInvoiceFacadeInputDTO {
    name: string;
    document: string;
    address: Address;
    items: {
        id?: string;
        name: string;
        price: number;
    }[];
}

export interface FindInvoiceFacadeInputDTO {
    id: string;
}

export interface InvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}

export default interface InvoiceFacadeInterface {
    generate(
        invoice: GenerateInvoiceFacadeInputDTO,
    ): Promise<InvoiceFacadeOutputDTO>;
    find(id: FindInvoiceFacadeInputDTO): Promise<InvoiceFacadeOutputDTO>;
}
