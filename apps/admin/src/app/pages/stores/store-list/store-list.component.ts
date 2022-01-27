import { Component, OnInit } from '@angular/core';
import { StoresService, Store } from '@agsa-shop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-store-list',
    templateUrl: './store-list.component.html',
    styleUrls: ['./store-list.component.scss']
})
export class StoresListComponent implements OnInit {
    stores: Store[] = [];

    constructor(
        private storesService: StoresService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getStores();
    }

    deleteStore(storeId: string) {
        this.confirmationService.confirm({
            message: 'Do yo want to delete this store?',
            header: 'Delete store',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.storesService.deleteStore(storeId).subscribe(
                    () => {
                        this._getStores();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Store was deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Store was not deleted'
                        });
                    }
                );
            }
        });
    }

    updateStore(storeId: string) {
        this.router.navigateByUrl(`stores/form/${storeId}`);
    }
    private _getStores() {
        this.storesService.getStores().subscribe((stores) => {
            this.stores = stores;
        });
    }
}
