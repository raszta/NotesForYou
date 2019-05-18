import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { MemberEditResolver } from '../resolvers/member-edit.resolver';
import { UserNotesListComponent } from './user-notes-list/user-notes-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
    UserNotesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    MemberEditResolver
  ],
})
export class UserModule { }
