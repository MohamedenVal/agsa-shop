// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product, ProductsService } from '@agsa-shop/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    productsFeat: Product[] = [];
    endSub$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this._getFeatured(4);
    }

    private _getFeatured(count: number) {
        this.productsService
            .getFeaturedProducts(count)
            .pipe(takeUntil(this.endSub$))
            .subscribe((prod) => {
                this.productsFeat = prod;
            });
    }

    ngOnDestroy(): void {
        this.endSub$.next();
        this.endSub$.complete();
    }
}
