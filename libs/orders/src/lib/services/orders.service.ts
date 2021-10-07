/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.apiURL + 'orders/';
    apiURLProducts = environment.apiURL + 'products/';

    constructor(private http: HttpClient) {}

    // Getting the categories from the backend
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    // Getting a specific catewgory by id
    getSingleOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}${orderId}`);
    }

    // Creating a order
    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, order);
    }

    // Updating a order
    updateOrder(
        orderStatus: { status: number },
        orderId?: string
    ): Observable<Order> {
        //updating a specific order
        return this.http.put<Order>(
            `${this.apiURLOrders}${orderId}`,
            orderStatus
        );
    }

    // Deleting a order
    deleteOrder(orderId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLOrders}${orderId}`);
    }
    // code for services in other libs but eliminating circler dependencies
    getSingleProduct(ProductId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}${ProductId}`);
    }
}
