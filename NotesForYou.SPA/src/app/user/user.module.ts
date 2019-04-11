import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
})
export class UserModule { }
