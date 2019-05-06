import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5001/api/auth/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient
  ) { }

  login(model: any) {
    this.httpClient.post(this.baseUrl, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(model: any) {
    return this.httpClient.post(this.baseUrl + 'register', model);
  }

  getUser(id): Observable<IUser> {
    return this.httpClient.get<IUser>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: IUser) {
    return this.httpClient.put(this.baseUrl + 'users/' + id, user);
  }
}
