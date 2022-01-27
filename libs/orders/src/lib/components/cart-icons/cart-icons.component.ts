import { Cart } from '../../models/cart';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icons.component.html',
    styleUrls: ['./cart-icons.component.css']
})
export class CartIconsComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    cartCount?: number = 0;
    savedCart?: Cart;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.savedCart = this.cartService.getCart();
        this.cartCount = this.savedCart.items?.length;

        this.cartService.cart$.subscribe((cart) => {
            this.cartCount = cart.items?.length;
        });
    }
}
