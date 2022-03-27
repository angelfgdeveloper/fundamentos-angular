import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const token = this.tokenService.getToken();

    // # 2
    // if (!token) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;

    // # 1
    // // return token ? true : false;

    // # 3
    return this.authService.user$
      .pipe(
        map(user => {
          if (!user) {
            this.router.navigate(['/home']);
            return false;
          }

          return true;
        })
      )
  }

}
