import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { NotFoundSiteComponent } from './shared/not-found-site/not-found-site.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutAppComponent } from './shared/about-app/about-app.component';
import { HowWorksNoteComponent } from './shared/how-works-note/how-works-note.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { UserNotesListComponent } from './user/user-notes-list/user-notes-list.component';
import { NotesListResolver } from './resolvers/notes-list.resolver';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { NoteEditResolver } from './resolvers/note-edit.resolver';
import { GoldenThoughtComponent } from './golden-thought/golden-thought.component';

export const appRoutes: Routes = [
  {
    path: 'stronaGlowna', component: HomeComponent
  },
  {
    path: 'admin', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'ustawienia', component: UserSettingsComponent, resolve: { user: MemberEditResolver },
    canDeactivate: [PreventUnsavedChanges], canActivate: [AuthGuard]
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'twojeNotatki', component: UserNotesListComponent, resolve: { user: NotesListResolver }, canActivate: [AuthGuard]
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'twojaNotatka/:id', component: EditNoteComponent, resolve: { user: NoteEditResolver }, canActivate: [AuthGuard]
  },
  {
    path: 'rejestracja', component: RegisterComponent
  },
  {
    path: 'logowanie', component: LoginComponent
  },
  {
    path: 'oAplikacji', component: AboutAppComponent
  },
  {
    path: 'notatkaPrzyklad', component: HowWorksNoteComponent
  },
  {
    path: 'dodajNotatke', component: AddNoteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'zloteMysli', component: GoldenThoughtComponent
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
