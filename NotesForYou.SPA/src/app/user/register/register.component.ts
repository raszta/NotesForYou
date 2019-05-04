import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: IUser;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(
        next => {
          this.alertifyService.success('Zostałeś zarejestrowany poprawnie!');
        },
        error => {
          this.alertifyService.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/notatki']);
          });
        }
      );
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  cancel() {
    this.router.navigateByUrl('/stronaGlowna');
    this.alertifyService.message('Anulowano');
  }
}
