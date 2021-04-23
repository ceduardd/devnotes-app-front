import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ValidatorService } from '../../../shared/services/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
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
    private validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
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

  showError(summary: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'errorToast',
      severity: 'error',
      summary,
    });
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
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.invalid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe((ok) => {
        if (ok === true) {
          this.router.navigateByUrl('/');
        } else {
          this.showError(`${ok}`);
        }
      });
    }
  }
}
