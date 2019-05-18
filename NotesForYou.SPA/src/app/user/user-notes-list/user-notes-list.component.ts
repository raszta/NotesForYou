import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
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
    private alertify: AlertifyService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data.user);

      this.notes = data['user'];
    });
  }

}
