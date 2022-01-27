/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from './../models/store';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class StoresService {
    apiURLStores = environment.apiURL + 'stores/';

    constructor(private http: HttpClient) {}

    // Getting the stores from the backend
    getStores(): Observable<Store[]> {
        return this.http.get<Store[]>(this.apiURLStores);
    }

    // Getting a specific store by id
    getSingleStore(storeId: string): Observable<Store> {
        return this.http.get<Store>(`${this.apiURLStores}${storeId}`);
    }

    // Creating a store
    createStore(store: Store): Observable<Store> {
        return this.http.post<Store>(this.apiURLStores, store);
    }

    // Updating a store
    updateStore(
        store: Store,
        storeId: string
    ): Observable<Store> {
        //updating a specific store
        return this.http.put<Store>(
            `${this.apiURLStores}${storeId}`,
            store
        );
    }

    // Deleting a store
    deleteStore(storeId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLStores}${storeId}`);
    }
}
