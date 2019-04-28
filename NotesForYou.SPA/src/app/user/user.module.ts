import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent
  ],
  providers: [
  ],
})
export class UserModule { }
