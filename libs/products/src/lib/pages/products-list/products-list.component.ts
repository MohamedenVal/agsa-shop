// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    CategoriesService,
    Category,
    Product,
    ProductsService
} from '@agsa-shop/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage!: boolean;

    constructor(
        private productsService: ProductsService,
        private CategoriesService: CategoriesService,
        private route: ActivatedRoute,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.setTitle();

        this.route.params.subscribe((params) => {
            params.categoryid
                ? this._getProducts([params.categoryid])
                : this._getProducts();

            params.categoryid
                ? (this.isCategoryPage = true)
                : (this.isCategoryPage = false);
        });
        this._getCategories();
    }

    public setTitle(): void {
        this.titleService.setTitle('المنتجات | ريم مارت' )
    }

    private _getProducts(selectedCategories?: string[]) {
        this.productsService
            .getProducts(selectedCategories)
            .subscribe((prods) => {
                this.products = prods;
            });
    }

    private _getCategories() {
        this.CategoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    categoriesFilter() {
        const selectedCategories = this.categories
            .filter((category) => category.checked)
            .map((category) => category.id);

        this._getProducts(selectedCategories);
    }
}
