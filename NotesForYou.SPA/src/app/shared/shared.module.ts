import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';
import { NotFoundSiteComponent } from './not-found-site/not-found-site.component';
import { RouterModule } from '@angular/router';
import { HowUseComponent } from './how-use/how-use.component';
import { AboutAppComponent } from './about-app/about-app.component';
import { HowWorksNoteComponent } from './how-works-note/how-works-note.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    NotFoundSiteComponent,
    HowUseComponent,
    AboutAppComponent,
    HowWorksNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    MenuComponent,
    NotFoundSiteComponent
  ]
})
export class SharedModule { }
