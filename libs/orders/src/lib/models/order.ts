import { User } from '@agsa-shop/users';
import { OrderItem } from './orderItem';

export class Order {
    id?: string;
    orderItems?: OrderItem;
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: number;
    user?: User;
    dateOrdered?: string;
}
