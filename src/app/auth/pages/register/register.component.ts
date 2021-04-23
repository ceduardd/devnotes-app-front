import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ValidatorService } from '../../../shared/services/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [MessageService],
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
    private validatorService: ValidatorService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showError(summary: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'errorToast',
      severity: 'error',
      summary,
    });
  }

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
    this.registerForm.markAllAsTouched();

    if (!this.registerForm.invalid) {
      const { name, email, password } = this.registerForm.value;

      this.authService.register(name, email, password).subscribe((ok) => {
        if (ok === true) {
          this.router.navigateByUrl('/');
        } else {
          this.showError(`${ok}`);
        }
      });
    }
  }
}
