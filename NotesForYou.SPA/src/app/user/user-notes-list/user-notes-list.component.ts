import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INote } from '../../models/note';

@Component({
  selector: 'app-user-notes-list',
  templateUrl: './user-notes-list.component.html',
  styleUrls: ['./user-notes-list.component.scss']
})
export class UserNotesListComponent implements OnInit {
  notes: INote[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.notes = data['user'];
    });
  }

  filterNotes(id: number) {
    this.notes.splice(this.notes.findIndex(n => n.id === id), 1);
  }

}
