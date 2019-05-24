import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });
  }

  logIn() {
    this.authService.login(this.loginForm.value).subscribe( result => {

      this.alertify.success('Zalogowałeś się prawidłowo!');
    },
    error => {
      this.alertify.error('Błędne hasło lub użytkownik!');
      this.loginForm.reset();
    },
      () => {
        this.router.navigate(['dodajNotatke']);
      }
    );
  }
  cancel() {
    this.router.navigateByUrl('/stronaGlowna');
    this.alertify.message('Anulowano');
  }

}
