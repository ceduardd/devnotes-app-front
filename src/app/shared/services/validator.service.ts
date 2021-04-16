import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public fullnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  equalFields(field1: string, field2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const password1 = control.get(field1)?.value;
      const password2 = control.get(field2)?.value;

      if (password1 !== password2) {
        control.get(field2)?.setErrors({ noEqualFields: true });
        return { noEqualFields: true };
      }

      control.get(field2)?.setErrors(null);
      return null;
    };
  }
}
