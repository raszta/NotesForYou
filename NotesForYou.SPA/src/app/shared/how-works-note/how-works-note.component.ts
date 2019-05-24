import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { INote } from '../../models/note';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-how-works-note',
  templateUrl: './how-works-note.component.html',
  styleUrls: ['./how-works-note.component.scss']
})
export class HowWorksNoteComponent implements OnInit {
  noteForm: FormGroup;
  note: INote;
  notes: INote[] = [];
  editorConfig = environment.editorConfig;

  constructor(
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

  createNote() {
    this.note = Object.assign({}, this.noteForm.value);
    this.note.dateCreated = new Date();
    this.notes.push(this.note);
  }

}
