import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor() {}

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const initialCart = {
                items: []
            };

            const initialCartJson = JSON.stringify(initialCart);
            localStorage.setItem(CART_KEY, initialCartJson);
        }
    }

    getCart(): Cart {
        const cartJsonString: string | null = localStorage.getItem(CART_KEY);
        if (cartJsonString) {
            const cart: Cart = JSON.parse(cartJsonString || '');
            return cart;
        }

        const initalCart: Cart = {
            items: []
        };
        return initalCart;
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();

        const cartItemExist = cart.items.find(
            (item) => item.productId === cartItem.productId
        );

        if (cartItemExist) {
            cart.items.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity + cartItem.quantity;
                }
            });
        } else {
            cart.items.push(cartItem);
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }

    delteCartItem(productId: string) {
        const cart = this.getCart();
        const newCart = cart.items.filter(
            (item) => item.productId !== productId
        );

        cart.items = newCart;
        const cartJsonString = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJsonString);
        this.cart$.next(cart);
    }
}