/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { User } from '@agsa-shop/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiUserURL = environment.apiURL + 'users';
    constructor(
        private http: HttpClient,
        private tokenService: LocalstorageService,
        private router: Router
    ) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiUserURL}/login`, {
            email,
            password
        });
    }

    logout() {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
    }
}
