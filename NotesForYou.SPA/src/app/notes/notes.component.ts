import { Component, OnInit } from '@angular/core';
import { INote } from '../models/note';
import { NotesService } from '../services/notes.service';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  noteForm: FormGroup;
  note: INote;

  editorConfig = {
  'editable': true,
    'spellcheck': true,
    'height': '400px',
    'minHeight': '400',
    'width': 'auto',
    'minWidth': '100',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Wpisz swoją notatkę...',
    'imageEndPoint': '',
    'toolbar': [
      ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
      ['fontName', 'fontSize', 'color'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
                  ]
};
  constructor(
    private noteService: NotesService,
    private authService: AuthService,
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
      this.alertify.success('Dodano notatkę');
    },
    error => {
      this.alertify.error('Błąd podczas dodawania notatki!');
    });
  }

}
