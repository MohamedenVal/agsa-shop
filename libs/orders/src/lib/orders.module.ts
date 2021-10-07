import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartIconsComponent } from './components/cart-icons/cart-icons.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { OrdersSummaryComponent } from './components/orders-summary/orders-summary.component';

const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        BadgeModule,
        ButtonModule,
        InputNumberModule
    ],
    declarations: [
        CartIconsComponent,
        CartPageComponent,
        OrdersSummaryComponent
    ],
    exports: [CartIconsComponent]
})
export class OrdersModule {
    constructor() {}
}
