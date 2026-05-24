import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/InvoiceItem.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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
        find: jest.fn(),
        generate: jest.fn().mockResolvedValue(invoice),
    };
};

describe("GenerateInvoiceUseCase", () => {
    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
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
                    name: "Item 1",
                    price: 100,
                },
            ],
        };

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address).toEqual(input.address);
        expect(result.items.at(0).id).toBeDefined();
        expect(result.items.at(0).name).toEqual(input.items[0].name);
        expect(result.items.at(0).price).toEqual(input.items[0].price);
    });
});
