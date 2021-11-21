/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Product } from '@agsa-shop/products';
import { CartItem } from '../../models/cart';
import { ProductsService } from '../../services/products.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;

    constructor(private productService: ProductsService) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {
        // ...
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1
        };
        this.productService.setCartItem(cartItem);
        console.log('product should be added to local storage!');
    }
}
