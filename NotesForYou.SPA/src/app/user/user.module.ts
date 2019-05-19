import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { MemberEditResolver } from '../resolvers/member-edit.resolver';
import { UserNotesListComponent } from './user-notes-list/user-notes-list.component';
import { NoteDetailsComponent } from '../notes/note-details/note-details.component';
import { EditNoteComponent } from '../notes/edit-note/edit-note.component';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';


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
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxEditorModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  providers: [
    MemberEditResolver
  ],
})
export class UserModule { }
