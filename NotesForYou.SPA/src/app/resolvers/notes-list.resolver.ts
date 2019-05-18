import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { NotesService } from '../services/notes.service';
import { INote } from '../models/note';

@Injectable()
export class NotesListResolver implements Resolve<INote> {

  constructor(
    private noteService: NotesService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<INote> {
    return this.noteService.getNotes().pipe(
      catchError(error => {
        this.alertify.error('Problem z załadowaniem danych');
        this.router.navigate(['/stronaGlowna']);
        return of(null);
      })
    );
  }

}
