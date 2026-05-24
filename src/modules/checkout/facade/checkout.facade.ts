import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
    CheckoutFacadeInterface,
    PlaceOrderFacadeInputDto,
    PlaceOrderFacadeOutputDto,
} from "./checkout.facade.interface";

export interface UseCasesProps {
    placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUsecase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._placeOrderUsecase = usecasesProps.placeOrderUseCase;
    }

    async placeOrder(
        input: PlaceOrderFacadeInputDto,
    ): Promise<PlaceOrderFacadeOutputDto> {
        return await this._placeOrderUsecase.execute(input);
    }
}
