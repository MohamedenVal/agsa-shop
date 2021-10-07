import { CartService } from '@agsa-shop/orders';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'eshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }

    ngOnInit(): void {}
}
