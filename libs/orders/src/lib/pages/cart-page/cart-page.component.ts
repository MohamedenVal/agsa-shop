/* eslint-disable @nrwl/nx/enforce-module-boundaries */
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
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CarttItemDetailed[] = [];
    endSubs$: Subject<any> = new Subject();
    cartCount?: number;
    subTotal!: number;
    

    constructor(
        private router: Router,
        private cartService: CartService,
        private OrdersService: OrdersService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.setTitle();

        this._getCartDetails();
    }

    public setTitle(): void {
        this.titleService.setTitle('الحاوية | ريم مارت')
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCart(cartItem: CarttItemDetailed) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }

    _getCartDetails() {
        this.cartService.cart$
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resCart) => {
                this.cartItemsDetailed = [];
                this.cartCount = resCart.items?.length;
                resCart.items?.forEach((cartItem) => {
                    this.OrdersService
                        .getSingleProduct(cartItem.productId ?? '1')
                        .subscribe((resProduct: Product) => {
                            this.cartItemsDetailed.push({
                                product: resProduct,
                                quantity: cartItem.quantity
                            });
                        });
                });
            });
    }

    // Implement some animation for removing an item from the cart

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
}
