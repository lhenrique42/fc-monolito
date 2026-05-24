import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    FindInvoiceFacadeInputDTO,
    GenerateInvoiceFacadeInputDTO,
    InvoiceFacadeOutputDTO,
} from "./invoice.facade.interface";

export interface UseCaseProps {
    generateUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUseCase: UseCaseInterface;
    private _findUseCase: UseCaseInterface;

    constructor(props: UseCaseProps) {
        this._generateUseCase = props.generateUseCase;
        this._findUseCase = props.findUseCase;
    }

    async generate(
        invoice: GenerateInvoiceFacadeInputDTO,
    ): Promise<InvoiceFacadeOutputDTO> {
        const result = await this._generateUseCase.execute(invoice);
        return {
            id: result.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items.map((item: any) => ({
                id: item.id.id || item.id,
                name: item.name,
                price: item.price,
            })),
            total: result.items.reduce((acc: number, item: any) => acc + item.price, 0),
        };
    }

    async find(id: FindInvoiceFacadeInputDTO): Promise<InvoiceFacadeOutputDTO> {
        const result = await this._findUseCase.execute(id);
        return {
            id: result.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items.map((item: any) => ({
                id: item.id.id || item.id,
                name: item.name,
                price: item.price,
            })),
            total: result.items.reduce((acc: number, item: any) => acc + item.price, 0),
        };
    }
}
