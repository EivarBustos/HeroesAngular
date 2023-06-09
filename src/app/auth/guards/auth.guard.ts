import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  private checkAuthStatus(): boolean | Observable<boolean>  {
    return this.authService.cheackAautentication()
    .pipe(
      tap(isAutenticated=> console.log('Autenticated :', isAutenticated)),
      tap(isAutenticated =>{
        if(!isAutenticated){
          this.router.navigate(['./auth/login'])
        }
      })
    )

  }


  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log({route, segments})
    // return true
    return this.checkAuthStatus();


  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log({route, state})
    // return true
    return this.checkAuthStatus();
  }

}
