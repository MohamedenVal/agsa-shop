import { CartService } from '@agsa-shop/orders';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'eshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleNav = new EventEmitter<string>();

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }

  navToggler() {
    this.toggleNav.emit('toggle');
  }
}
