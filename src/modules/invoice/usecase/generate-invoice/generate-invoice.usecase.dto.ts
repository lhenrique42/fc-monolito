import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/InvoiceItem.entity";

export interface GenerateInvoiceInputDto {
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
}

export interface GenerateInvoiceOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt: Date;
    updatedAt: Date;
}
