import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';
import { NotFoundSiteComponent } from './not-found-site/not-found-site.component';
import { AboutAppComponent } from './about-app/about-app.component';
import { HowWorksNoteComponent } from './how-works-note/how-works-note.component';
import { FeatureModule } from './feature.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    NotFoundSiteComponent,
    AboutAppComponent,
    HowWorksNoteComponent
  ],
  imports: [
    FeatureModule,
    UserModule
  ],
  exports: [
    FooterComponent,
    MenuComponent,
    NotFoundSiteComponent
  ]
})
export class SharedModule { }
