/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = environment.apiURL + 'categories/';

    constructor(private http: HttpClient) {}

    // Getting the categories from the backend
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }

    // Getting a specific catewgory by id
    getSingleCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiURLCategories}${categoryId}`);
    }

    // Creating a category
    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories, category);
    }

    // Updating a category
    updateCategory(
        category: Category,
        categoryId: string
    ): Observable<Category> {
        //updating a specific category
        return this.http.put<Category>(
            `${this.apiURLCategories}${categoryId}`,
            category
        );
    }

    // Deleting a category
    deleteCategory(categoryId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLCategories}${categoryId}`);
    }
}
