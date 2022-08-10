/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsGuard implements CanActivate {

  constructor(
    private storageService: LocalstorageService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    const token = this.storageService.getToken();

    if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        if (!this._tokenExpired(tokenDecode.exp)){
          // this.router.navigate(['/client/profile']);
          return true;
        }
    }
    this.router.navigate(['/client/sign-in']);
    return false;

  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}
