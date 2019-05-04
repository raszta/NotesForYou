import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {
  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.message('Zaloguj się aby mieć dostęp!');
    this.router.navigate(['/stronaGlowna']);
    return false;
  }
}
