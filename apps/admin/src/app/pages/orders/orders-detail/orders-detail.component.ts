import { Order, OrdersService } from '@agsa-shop/orders';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS } from '../order-list';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
    order!: Order;

    constructor(
        private orderService: OrdersService,
        private router: ActivatedRoute
    ) {}

    orderStatus = [
        { name: 'Pending', value: 0 },
        { name: 'Processed', value: 1 },
        { name: 'Shipped', value: 2 },
        { name: 'Delivered', value: 3 },
        { name: 'Failed', value: 4 }
    ];

    selectedStatus = '';

    ngOnInit(): void {
        this._getOrder();
    }

    private _getOrder() {
        this.router.params.subscribe((params) => {
            if (params.id) {
                this.orderService
                    .getSingleOrder(params.id)
                    .subscribe((order) => {
                        this.order = order;
                    });
            }
        });
    }
}
