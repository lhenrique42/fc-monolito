import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/InvoiceItem.entity";

export interface FindInvoiceInputDto {
    id: string;
}

export interface FindInvoiceOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt: Date;
    updatedAt: Date;
}
