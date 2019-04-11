import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/auth/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(
    private htppClient: HttpClient
  ) { }

  login(model: any) {
    this.htppClient.post(this.baseUrl, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }
}
