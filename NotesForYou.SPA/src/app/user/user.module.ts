import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserNotesListComponent } from './user-notes-list/user-notes-list.component';
import { NoteDetailsComponent } from '../notes/note-details/note-details.component';
import { EditNoteComponent } from '../notes/edit-note/edit-note.component';
import { FeatureModule } from '../feature.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
    UserNotesListComponent,
    NoteDetailsComponent,
    EditNoteComponent,
  ],
  imports: [
    FeatureModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
    NoteDetailsComponent,
  ],
})
export class UserModule { }
