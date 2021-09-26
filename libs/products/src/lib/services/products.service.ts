import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiURL + 'products/';

    constructor(private http: HttpClient) {}

    // Getting the categories from the backend
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts);
    }

    // Getting a specific catewgory by id
    getSingleProduct(ProductId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}${ProductId}`);
    }

    // Creating a Product
    createProduct(productFormData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productFormData);
    }

    // Updating a Product
    updateProduct(
        productFormData: FormData,
        ProductId: string
    ): Observable<Product> {
        //updating a specific Product
        return this.http.put<Product>(
            `${this.apiURLProducts}${ProductId}`,
            productFormData
        );
    }

    // Deleting a Product
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteProduct(ProductId: string): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.http.delete<any>(`${this.apiURLProducts}${ProductId}`);
    }
}
