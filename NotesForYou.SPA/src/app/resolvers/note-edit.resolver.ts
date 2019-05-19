import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { catchError, tap } from 'rxjs/operators';
import { INote } from '../models/note';
import { NotesService } from '../services/notes.service';

@Injectable()
export class NoteEditResolver implements Resolve<INote> {

  constructor(
    private noteService: NotesService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<INote> {
    return this.noteService.getNote(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problem z załadowaniem danych');
        this.router.navigate(['/stronaGlowna']);
        return of(null);
      })
    );
  }

}
