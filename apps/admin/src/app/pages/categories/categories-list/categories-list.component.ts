import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@agsa-shop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do yo want to delete this category?',
            header: 'Delete categoty',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    () => {
                        this._getCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Category was deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category was not deleted'
                        });
                    }
                );
            }
        });
    }

    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }
    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
