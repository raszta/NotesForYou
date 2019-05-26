import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { INote } from '../../models/note';
import { NotesService } from '../../services/notes.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  @Input() note: INote;
  @Output() deletedNote = new EventEmitter<number>();
  constructor(
    private noteService: NotesService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteNote(id: number) {
    this.alertify.confirm('Czy na pewno chcesz usunąć notatkę?', () => {
      this.noteService.deleteNote(id).subscribe(next => {
        this.deletedNote.emit(id);
        this.alertify.success('Usunięto notatkę');
      },
        error => {
          this.alertify.error('Błąd podczas usuwania notatki!');
        });
    });
  }

}
