export class Cart {
    items?: CartItem[];
}

export class CartItem {
    productId?: string;
    quantity?: number;
}

export class CarttItemDetailed {
    product?: any;
    quantity?: number;
}
