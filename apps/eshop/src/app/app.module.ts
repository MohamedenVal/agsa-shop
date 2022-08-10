import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// Libs Module
import { ProductsModule } from '@agsa-shop/products';
import { UiModule } from '@agsa-shop/ui';
import { OrdersModule } from '@agsa-shop/orders';
import { UsersModule } from '@agsa-shop/users';
import { ClientsModule } from '@agsa-shop/clients';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { SideBarComponent } from './shared/side-bar/side-bar.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        FooterComponent,
        HeaderComponent,
        NavComponent,
        SideBarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ProductsModule,
        UiModule,
        OrdersModule,
        UsersModule,
        ClientsModule,
        AccordionModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
