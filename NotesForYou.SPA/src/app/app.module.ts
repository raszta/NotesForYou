import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { environment } from '../environments/environment.prod';
import { NotesService } from './services/notes.service';
import { UserService } from './services/user.service';
import { NotesComponent } from './notes/notes.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    UserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'AngularClient Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        blacklistedRoutes: ['localhost:5001/api/auth'],
        whitelistedDomains: ['localhost:5001']
      }
    }),
    NgxEditorModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AlertifyService,
    AuthService,
    NotesService,
    UserService,
    ErrorInterceptorProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
