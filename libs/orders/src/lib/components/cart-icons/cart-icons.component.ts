import { CartService } from '@agsa-shop/orders';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icons.component.html',
    styleUrls: ['./cart-icons.component.css']
})
export class CartIconsComponent implements OnInit {
    cartCount = '0';

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe((cart) => {
            this.cartCount = cart?.items.length + '' ?? '0';
        });
    }
}
