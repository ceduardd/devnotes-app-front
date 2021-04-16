import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          // Validators.pattern(this.validatorService.fullnamePattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [this.validatorService.equalFields('password', 'password2')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {}

  isInvalidField(field: string): boolean {
    return (
      this.registerForm.controls[field].invalid &&
      this.registerForm.controls[field].touched
    );
  }

  markAsInvalidField(field: string): string {
    return this.isInvalidField(field) ? 'ng-invalid ng-dirty' : '';
  }

  get emailErrorMessage(): string {
    const emailErrors = this.registerForm.get('email')?.errors;

    if (emailErrors?.required) {
      return 'El email es requerido';
    } else if (emailErrors?.pattern) {
      return 'El email ingresado no tiene un formato válido';
    }

    return '';
  }

  register() {
    // TODO: implement register method
    console.log(this.registerForm.value);

    this.registerForm.markAllAsTouched();

    if (!this.registerForm.invalid) {
      console.log('register...');
    }
  }
}
