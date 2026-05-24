import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";

export default class CheckoutRepository implements CheckoutGateway {
    private _orders: Order[] = [];

    async addOrder(order: Order): Promise<void> {
        this._orders.push(order);
    }

    async findOrder(id: string): Promise<Order | null> {
        const order = this._orders.find((order) => order.id.id === id);
        return order || null;
    }
}
