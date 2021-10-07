import {
    CartService,
    OrdersService,
    CarttItemDetailed
} from '@agsa-shop/orders';
import { Product } from '../../models/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CarttItemDetailed[] = [];
    endSubs$: Subject<any> = new Subject();
    cartCount = 0;

    constructor(
        private router: Router,
        private cartService: CartService,
        private productService: OrdersService
    ) {}

    ngOnInit(): void {
        this._getCartDeatails();
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCart(cartItem: CarttItemDetailed) {
        this.cartService.delteCartItem(cartItem.product.id);
    }

    _getCartDeatails() {
        this.cartService.cart$
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resCart) => {
                this.cartItemsDetailed = [];
                this.cartCount = resCart?.items?.length ?? 0;
                resCart.items.forEach((cartItem) => {
                    this.productService
                        .getSingleProduct(cartItem.productId || '')
                        .subscribe((resProduct: Product) => {
                            this.cartItemsDetailed.push({
                                product: resProduct,
                                quantity: cartItem.quantity
                            });
                        });
                });
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
}
