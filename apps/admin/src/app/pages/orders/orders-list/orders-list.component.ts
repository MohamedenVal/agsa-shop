import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@agsa-shop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

const ORDER_STATUS = {
    0: {
        label: 'Pending',
        color: 'primary'
    },
    1: {
        label: 'Processed',
        color: 'warning'
    },
    2: {
        label: 'Shipped',
        color: 'warning'
    },
    3: {
        label: 'Delivered',
        color: 'success'
    },
    4: {
        label: 'Failed',
        color: 'danger'
    }
};

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;
    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Do yo want to delete this order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this._getOrders();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Order was deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Order was not deleted'
                        });
                    }
                );
            }
        });
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }
    private _getOrders() {
        this.ordersService.getOrders().subscribe((cats) => {
            this.orders = cats;
        });
    }

    getStatusLabel(order: Order): string {
        switch (order.status) {
            case 4:
                return this.orderStatus[4].label;
                break;
            case 3:
                return this.orderStatus[3].label;
                break;
            case 2:
                return this.orderStatus[2].label;
                break;
            case 1:
                return this.orderStatus[1].label;
                break;

            default:
                return this.orderStatus[0].label;
                break;
        }
    }
    getStatuscolor(order: Order): string {
        switch (order.status) {
            case 4:
                return this.orderStatus[4].color;
                break;
            case 3:
                return this.orderStatus[3].color;
                break;
            case 2:
                return this.orderStatus[2].color;
                break;
            case 1:
                return this.orderStatus[1].color;
                break;

            default:
                return this.orderStatus[0].color;
                break;
        }
    }
}
