import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@agsa-shop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];

    constructor(
        private productsService: ProductsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do yo want to delete this product?',
            header: 'Delete categoty',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService.deleteProduct(productId).subscribe(
                    () => {
                        this._getProducts();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'product was deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'product was not deleted'
                        });
                    }
                );
            }
        });
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }
    private _getProducts() {
        this.productsService.getProducts().subscribe((cats) => {
            this.products = cats;
        });
    }
}
