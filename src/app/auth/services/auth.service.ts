import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl= environments.baseUrl;
  private user?: User;
  constructor(private httpClient: HttpClient) { }

  get currentUser():User | undefined{
  if (!this.user) return undefined;
  return  structuredClone (this.user);
  }

  login( email: string, password: string ):Observable<User> {
    // http.post('login',{ email, password });
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k' )),
      );
  }

   //Guardar la sesion al recargar
   //doble ! el primero es false y ocn otro es true !!
  cheackAautentication():Observable<boolean>{
    if(!localStorage.getItem('token')) return of(false);

    const token=localStorage.getItem(`token`);
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap(user => this.user=user),
      map( user => !!user),
      catchError(error=> of(false))
    )

    return of(true)

  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }
}
