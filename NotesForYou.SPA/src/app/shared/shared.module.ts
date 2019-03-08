import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';
import { NotFoundSiteComponent } from './not-found-site/not-found-site.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    NotFoundSiteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    MenuComponent
  ]
})
export class SharedModule { }
