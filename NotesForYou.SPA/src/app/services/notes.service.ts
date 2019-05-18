import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { INote } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  addNote(userId: number, note: INote) {
    return this.httpClient.post(this.baseUrl + 'notes/' + userId, note);
  }
}
