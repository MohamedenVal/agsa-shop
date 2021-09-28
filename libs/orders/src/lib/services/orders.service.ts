/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '@agsa-shop/orders';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.apiURL + 'orders/';

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
    updateOrder(order: Order, orderId: string): Observable<Order> {
        //updating a specific order
        return this.http.put<Order>(`${this.apiURLOrders}${orderId}`, order);
    }

    // Deleting a order
    deleteOrder(orderId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLOrders}${orderId}`);
    }
}
