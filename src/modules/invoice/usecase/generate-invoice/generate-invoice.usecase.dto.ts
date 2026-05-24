import Address from "../../../@shared/domain/value-object/address";

export interface GenerateInvoiceInputDto {
    name: string;
    document: string;
    address: Address;
    items: {
        id?: string;
        name: string;
        price: number;
    }[];
}

export interface GenerateInvoiceOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
