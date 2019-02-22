import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin', component: DashboardComponent
  },
  {
    path: 'ustawienia', component: UserSettingsComponent
  },
  {
    path: 'rejestracja', component: RegisterComponent
  },
  {
    path: 'logowanie', component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
