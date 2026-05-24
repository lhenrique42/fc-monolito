import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacade from "./checkout.facade";
import {
    PlaceOrderFacadeInputDto,
    PlaceOrderFacadeOutputDto,
} from "./checkout.facade.interface";

const mockPlaceOrderUseCase = (): UseCaseInterface => ({
    execute: jest.fn(),
});

describe("CheckoutFacade unit tests", () => {
    let sut: CheckoutFacade;
    let placeOrderUseCase: jest.Mocked<UseCaseInterface>;

    beforeEach(() => {
        placeOrderUseCase =
            mockPlaceOrderUseCase() as jest.Mocked<UseCaseInterface>;
        sut = new CheckoutFacade({
            placeOrderUseCase,
        });
    });

    it("should place an order successfully", async () => {
        // Arrange
        const clientId = "client-1";
        const productId = "product-1";
        const orderId = "order-1";

        const input: PlaceOrderFacadeInputDto = {
            clientId,
            products: [{ productId }],
        };

        const expectedOutput: PlaceOrderFacadeOutputDto = {
            id: orderId,
            total: 100,
            products: [{ productId }],
        };

        placeOrderUseCase.execute.mockResolvedValue(expectedOutput);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
        expect(placeOrderUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it("should place an order with multiple products", async () => {
        // Arrange
        const clientId = "client-1";
        const product1Id = "product-1";
        const product2Id = "product-2";
        const orderId = "order-1";

        const input: PlaceOrderFacadeInputDto = {
            clientId,
            products: [{ productId: product1Id }, { productId: product2Id }],
        };

        const expectedOutput: PlaceOrderFacadeOutputDto = {
            id: orderId,
            total: 300,
            products: [{ productId: product1Id }, { productId: product2Id }],
        };

        placeOrderUseCase.execute.mockResolvedValue(expectedOutput);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
    });

    it("should throw an error when usecase throws an error", async () => {
        // Arrange
        const input: PlaceOrderFacadeInputDto = {
            clientId: "client-1",
            products: [{ productId: "product-1" }],
        };

        const errorMessage = "Client not found";
        placeOrderUseCase.execute.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(sut.placeOrder(input)).rejects.toThrow(errorMessage);
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
    });

    it("should handle empty products list", async () => {
        // Arrange
        const input: PlaceOrderFacadeInputDto = {
            clientId: "client-1",
            products: [],
        };

        const expectedOutput: PlaceOrderFacadeOutputDto = {
            id: "order-1",
            total: 0,
            products: [],
        };

        placeOrderUseCase.execute.mockResolvedValue(expectedOutput);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
    });

    it("should handle large order with many products", async () => {
        // Arrange
        const clientId = "client-1";
        const products = Array.from({ length: 10 }, (_, i) => ({
            productId: `product-${i + 1}`,
        }));

        const input: PlaceOrderFacadeInputDto = {
            clientId,
            products,
        };

        const expectedOutput: PlaceOrderFacadeOutputDto = {
            id: "order-1",
            total: 1000,
            products,
        };

        placeOrderUseCase.execute.mockResolvedValue(expectedOutput);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
        expect(result.products).toHaveLength(10);
    });

    it("should return correct order structure", async () => {
        // Arrange
        const input: PlaceOrderFacadeInputDto = {
            clientId: "client-1",
            products: [{ productId: "product-1" }],
        };

        const expectedOutput: PlaceOrderFacadeOutputDto = {
            id: "order-1",
            total: 100,
            products: [{ productId: "product-1" }],
        };

        placeOrderUseCase.execute.mockResolvedValue(expectedOutput);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("total");
        expect(result).toHaveProperty("products");
        expect(typeof result.id).toBe("string");
        expect(typeof result.total).toBe("number");
        expect(Array.isArray(result.products)).toBe(true);
    });

    it("should handle usecase returning null values", async () => {
        // Arrange
        const input: PlaceOrderFacadeInputDto = {
            clientId: "client-1",
            products: [{ productId: "product-1" }],
        };

        const expectedOutput: PlaceOrderFacadeOutputDto = {
            id: "",
            total: 0,
            products: [],
        };

        placeOrderUseCase.execute.mockResolvedValue(expectedOutput);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
    });

    it("should handle usecase returning undefined", async () => {
        // Arrange
        const input: PlaceOrderFacadeInputDto = {
            clientId: "client-1",
            products: [{ productId: "product-1" }],
        };

        placeOrderUseCase.execute.mockResolvedValue(undefined as any);

        // Act
        const result = await sut.placeOrder(input);

        // Assert
        expect(result).toBeUndefined();
        expect(placeOrderUseCase.execute).toHaveBeenCalledWith(input);
    });
});
