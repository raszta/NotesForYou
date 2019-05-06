import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserSettingsComponent } from '../user/user-settings/user-settings.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<UserSettingsComponent> {
  canDeactivate(component: UserSettingsComponent) {
    if (component.editForm.dirty) {
      return confirm('Czy na pewno chcesz opuścić stronę?');
    }
    return true;
  }
}
