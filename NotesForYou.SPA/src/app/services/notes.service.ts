import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { INote } from '../models/note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  addNote(note: INote) {
    return this.httpClient.post(this.baseUrl + 'notes/dodaj/' + this.authService.decodedToken.nameid, note);
  }

  getNote(id: number) {
    return this.httpClient.get<INote>(this.baseUrl + 'notes/' + this.authService.decodedToken.nameid + '/mojaNotatka' + id );
  }

  getNotes(): Observable<INote> {
    return this.httpClient.get<INote>(this.baseUrl + 'notes/' + this.authService.decodedToken.nameid + '/mojeNotatki');
  }
}
