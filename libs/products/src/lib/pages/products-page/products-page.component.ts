import { CartItem } from '../../models/cart';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product, ProductsService } from '@agsa-shop/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


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
        private productService: ProductsService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.setTitle();
        
        this.route.params.subscribe((params) => {
            if (params.productid) {
                // this._getProduct(params.productid);
                this._getProductName(params.productid)
                console.log(params.productid);           
            }
        });
    }

    public setTitle(name=""): void {
        this.titleService.setTitle(' المنتجات ريم مارت  | ' + name )
    }

    private _getProduct(id: string) {
        this.productsService
            .getSingleProduct(id)
            .pipe(takeUntil(this.endSub$))
            .subscribe((resProduct) => {
                this.product = resProduct;
                this.setTitle(resProduct.name)
            });
    }

    private _getProductName(name: string){
        this.productService
            .getProductByName(name)
            .pipe(takeUntil(this.endSub$))
            .subscribe((resProduct) => {
                this.product = resProduct[0];
                this.setTitle(this.product.name)
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
