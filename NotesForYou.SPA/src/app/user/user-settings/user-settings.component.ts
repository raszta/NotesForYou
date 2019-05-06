import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { IUser } from '../..//models/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  user: IUser;
  @ViewChild('editForm') editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alertify.success('Użytkownik edytowany pomyślnie!');
        this.editForm.reset(this.user);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

}
