import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HowWorksComponent } from './usage/how-works/how-works.component';
import { UsageComponent } from './usage/usage.component';
import { NotFoundSiteComponent } from './shared/not-found-site/not-found-site.component';

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
    path: 'jakDziala', component: HowWorksComponent
  },
  {
    path: 'oAplikacji', component: UsageComponent
  },
  {
    path: '404', component: NotFoundSiteComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  },
];
