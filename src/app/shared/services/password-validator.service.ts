import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from 'src/app/settings/services/settings.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidatorService implements AsyncValidator {
  constructor(private settingsService: SettingsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const password = control.value;
    control.setErrors(null);

    return this.settingsService.verifyCurrentPassword(password).pipe(
      map((res) => {
        return res.ok ? null : { wrongPassword: true };
      })
    );
  }
}
