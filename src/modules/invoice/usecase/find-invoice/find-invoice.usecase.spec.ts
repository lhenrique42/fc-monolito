import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/InvoiceItem.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "123456789",
    address: {
        _street: "Street 1",
        _number: "123",
        _complement: "Complement 1",
        _city: "City 1",
        _state: "State 1",
        _zipCode: "12345-678",
    } as Address,
    items: [
        {
            id: new Id("1"),
            name: "Item 1",
            price: 100,
        } as InvoiceItem,
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    };
};

describe("FindInvoiceUseCase", () => {
    it("should find an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items).toEqual(invoice.items);
        expect(result.createdAt).toEqual(invoice.createdAt);
        expect(result.updatedAt).toEqual(invoice.updatedAt);
    });
});
