import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from '../../settings/services/settings.service';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private settingsService: SettingsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return this.settingsService.verifyEmailTaken(email).pipe(
      map((res) => {
        return res.ok ? { emailTaken: true } : null;
      })
    );
  }
}
