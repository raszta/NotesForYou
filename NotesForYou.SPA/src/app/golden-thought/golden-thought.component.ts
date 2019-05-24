import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { INote } from '../models/note';

@Component({
  selector: 'app-golden-thought',
  templateUrl: './golden-thought.component.html',
  styleUrls: ['./golden-thought.component.scss']
})
export class GoldenThoughtComponent implements OnInit {
  goldenThoughts: any;

  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit() {
    this.noteService.getAllNotes().subscribe( result => {
      this.goldenThoughts = result;
      this.goldenThoughts = this.goldenThoughts.filter(el => el.goldenThought);
    });
  }

}
