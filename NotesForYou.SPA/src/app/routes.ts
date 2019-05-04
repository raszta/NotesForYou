import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { NotFoundSiteComponent } from './shared/not-found-site/not-found-site.component';
import { NotesComponent } from './notes/notes.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutAppComponent } from './shared/about-app/about-app.component';
import { HowUseComponent } from './shared/how-use/how-use.component';
import { HowWorksNoteComponent } from './shared/how-works-note/how-works-note.component';

export const appRoutes: Routes = [
  {
    path: 'stronaGlowna', component: HomeComponent
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
    path: 'jakDziala', component: HowUseComponent
  },
  {
    path: 'oAplikacji', component: AboutAppComponent
  },
  {
    path: 'notatkaPrzyklad', component: HowWorksNoteComponent
  },
  {
    path: 'notatki', component: NotesComponent, canActivate: [AuthGuard]
  },
  {
    path: '404', component: NotFoundSiteComponent
  },
  {
    path: '',
    redirectTo: '/stronaGlowna',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  },
];
