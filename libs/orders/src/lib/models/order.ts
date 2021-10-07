// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from './user';
import { OrderItem } from './orderItem';

export class Order {
    id!: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    country?: string;
    phone?: string;
    status!: number;
    totalPrice?: number;
    user!: User;
    dateOrdered?: string;
}
