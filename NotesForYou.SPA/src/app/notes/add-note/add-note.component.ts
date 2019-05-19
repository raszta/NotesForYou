import { Component, OnInit } from '@angular/core';
import { INote } from '../../models/note';
import { AlertifyService } from '../../services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notes',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  noteForm: FormGroup;
  note: INote;
  editorConfig = environment.editorConfig;

  constructor(
    private noteService: NotesService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createNoteForm();
  }

  createNoteForm() {
    this.noteForm = this.fb.group({
      goldenThought: ['false'],
      content: ['', Validators.required]
    });
  }

  saveNote() {
    this.note = Object.assign({}, this.noteForm.value);

    this.noteService.addNote(this.note).subscribe( next => {
      this.alertify.success('Dodano notatkę!');
      this.noteForm.reset({goldenThought: 'false'});
    },
    error => {
      this.alertify.error('Błąd podczas dodawania notatki!');
    });
  }

}
