import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent
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
