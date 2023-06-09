import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  //ESTE SE USA PARA CUANDO ESTAMOS EN SESION CERRAR BIEN LA SECCION

  private checkAuthStatus(): boolean | Observable<boolean>  {
    return this.authService.cheackAautentication()
    .pipe(
      tap(isAutenticated=> console.log('Autenticated :', isAutenticated)),
      tap(isAutenticated =>{
        if(isAutenticated){
          this.router.navigate(['./'])
        }
      }),
      map(isAutenticated =>!isAutenticated)
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

