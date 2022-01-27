import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    apiURLProducts = environment.apiURL + 'products/';
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor(private http: HttpClient) {}

    // Getting the product from the backend
    getProducts(selectedCats?: string[]): Observable<Product[]> {
        let params = new HttpParams();
        if (selectedCats) {
            params = params.append('categories', selectedCats.join(','));
            return this.http.get<Product[]>(this.apiURLProducts, { params });
        }
        return this.http.get<Product[]>(this.apiURLProducts);
    }

    // Getting a specific product by id
    getSingleProduct(ProductId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}${ProductId}`);
    }
    // Getting a product by name
    getProductByName(productName: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiURLProducts}name/${productName}`);
    }

    // Creating a Product
    createProduct(productFormData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productFormData);
    }

    // Getting featured products
    getFeaturedProducts(count: number): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${this.apiURLProducts}get/featured/${count}`
        );
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

    getCart(): Cart {
        const cartJsonString: string | null = localStorage.getItem(CART_KEY);
        if (cartJsonString) {
            const cart: Cart = JSON.parse(cartJsonString || '');
            return cart;
        }

        const initalCart: Cart = {
            items: []
        };
        return initalCart;
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();

        const cartItemExist = cart.items.find(
            (item) => item.productId === cartItem.productId
        );

        if (cartItemExist) {
            cart.items.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity + cartItem.quantity;
                }
            });
        } else {
            cart.items.push(cartItem);
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }

    uploadProductImages(
        productFormData: FormData,
        ProductId: string
    ): Observable<Product> {
        return this.http.put<Product>(
            `${this.apiURLProducts}/gallery-image/${ProductId}`,
            productFormData
        );
    }
}
