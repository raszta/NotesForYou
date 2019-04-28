import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';
import { NotFoundSiteComponent } from './not-found-site/not-found-site.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    NotFoundSiteComponent
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
