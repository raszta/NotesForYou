import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { INote } from '../../models/note';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  editForm: FormGroup;
  note: INote;
  editorConfig = environment.editorConfig;

  constructor(
    private route: ActivatedRoute,
    private noteService: NotesService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.note = data['user'];
    });
    this.createNoteForm();
  }

  createNoteForm() {
    this.editForm = this.fb.group({
      id: this.note.id,
      goldenThought: ['this.note.goldenThought'],
      content: this.note.content
    });
  }

  updateNote() {
    this.note = Object.assign({}, this.editForm.value);
    this.noteService.updateNote(this.note).subscribe(
      next => {
        this.alertify.success('Notatka edytowana pomyślnie!');
        this.editForm.reset(this.note);
      },
      error => {
        this.alertify.error('Wystąpił błąd podczas edycji!');
      }
    );
  }

}
