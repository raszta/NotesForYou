import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user';

@Injectable()
export class MemberEditResolver implements Resolve<IUser> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError( error => {
        this.alertify.error('Problem z załadowaniem danych');
        this.router.navigate(['/stronaGlowna']);
        return of(null);
      })
    );
  }

}
