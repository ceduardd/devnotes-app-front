import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
    ],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {}

  isInvalidField(field: string): boolean {
    return (
      this.loginForm.controls[field].invalid &&
      this.loginForm.controls[field].touched
    );
  }

  markAsInvalidField(field: string): string {
    return this.isInvalidField(field) ? 'ng-invalid ng-dirty' : '';
  }

  get emailErrorMessage(): string {
    const emailErrors = this.loginForm.get('email')?.errors;

    if (emailErrors?.required) {
      return 'El email es requerido para iniciar sesión';
    } else if (emailErrors?.pattern) {
      return 'El email ingresado no tiene un formato válido';
    }

    return '';
  }

  login() {
    // TODO: Implement login method
    console.log(this.loginForm.value);

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.invalid) {
      console.log('submit...');
    }
  }
}
