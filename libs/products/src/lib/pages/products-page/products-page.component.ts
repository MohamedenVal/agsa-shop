import { CartItem } from '../../models/cart';
import { Product, ProductsService } from '@agsa-shop/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
    product!: Product;
    endSub$: Subject<any> = new Subject();
    value!: string;
    quantity = 1;

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private productService: ProductsService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getProduct(params.productid);
            }
        });
    }

    private _getProduct(id: string) {
        this.productsService
            .getSingleProduct(id)
            .pipe(takeUntil(this.endSub$))
            .subscribe((resProduct) => {
                this.product = resProduct;
            });
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };

        this.productService.setCartItem(cartItem);
    }

    ngOnDestroy(): void {
        this.endSub$.next();
        this.endSub$.complete();
    }
}
