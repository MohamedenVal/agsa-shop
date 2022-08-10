// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product, ProductsService } from '@agsa-shop/products';
import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit, AfterContentInit, OnDestroy {
    productsFeat: Product[] = [];
    endSub$: Subject<any> = new Subject();

    @Input() featuredLimit!: number;

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
      this._getFeatured(this.featuredLimit);
      console.log('ng on in it');

    }

    ngAfterContentInit(): void {
      console.log("after conten init");

    }

    private _getFeatured(count=4) {
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
        console.log("on destory");

    }
}
