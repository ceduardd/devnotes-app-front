import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { EmailValidatorService } from '../../../shared/services/email-validator.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  providers: [MessageService],
})
export class SettingsComponent implements OnInit {
  @ViewChild('fileChooser') fileChooser!: ElementRef<HTMLInputElement>;

  passwordInputsHidden: boolean = true;
  uploading: boolean = false;

  debouncer: Subject<string> = new Subject();

  settingsForm = this.fb.group(
    {
      name: [this.user.name, [Validators.required]],
      email: [
        this.user.email,
        [Validators.required],
        [this.emailValidatorService],
      ],
      password: ['', [Validators.required], [this.passwordValidationService]],
      newPass1: ['', [Validators.required, Validators.minLength(6)]],
      newPass2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [this.validatorService.equalFields('newPass1', 'newPass2')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService,
    private passwordValidationService: PasswordValidatorService
  ) {}

  get user() {
    return this.authService.user;
  }

  get profilePic() {
    return this.user.photoUrl
      ? this.user.photoUrl
      : 'assets/profile-pic-placeholder.jpg';
  }

  ngOnInit(): void {}

  showPasswordInputs() {
    this.passwordInputsHidden = !this.passwordInputsHidden;
  }

  showToast(severity: string, summary: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'feedbackToast',
      sticky: true,
      severity,
      summary,
    });
  }

  nameEmailInvalid(): boolean {
    return (
      this.settingsForm.get('name')!.invalid ||
      this.settingsForm.get('email')!.invalid
    );
  }

  saveProfileChanges() {
    if (this.settingsForm.pristine && this.passwordInputsHidden) {
      this.showToast('success', 'Los cambios han sido guardados');
      return;
    }

    if (this.passwordInputsHidden) {
      if (this.nameEmailInvalid()) {
        this.showToast('error', 'Hay campos inválidos o vacios');
        return;
      }

      const { name, email } = this.settingsForm.value;

      this.settingsService.updateProfile({ name, email }).subscribe((ok) => {
        if (ok !== true) {
          return this.showToast('error', `${ok}`);
        }
      });
    } else {
      if (this.settingsForm.invalid) {
        this.showToast('error', 'Hay campos inválidos o vacios');
        return;
      }

      const { name, email, newPass1 } = this.settingsForm.value;

      this.settingsService
        .updateProfile({ name, email, password: newPass1 })
        .subscribe((ok) => {
          if (ok !== true) {
            return this.showToast('error', `${ok}`);
          }
        });
    }

    this.showToast('success', 'Los cambios han sido guardados');
  }

  updateProfilePic() {
    this.fileChooser?.nativeElement.click();
  }

  fileChooserHandler(e: Event) {
    const target = e.target as HTMLInputElement;

    const filesList: FileList = target.files!;

    console.log(filesList);

    if (filesList.length > 0) {
      this.uploading = true;
      this.settingsService.uploadImage(filesList[0]).subscribe((_) => {
        this.uploading = false;
      });
    }
  }

  removeProfilePic() {
    this.settingsService.removePhoto().subscribe();
  }

  isInvalidField(field: string): boolean {
    return (
      this.settingsForm.controls[field].invalid &&
      this.settingsForm.controls[field].touched
    );
  }

  markAsInvalidField(field: string): string {
    return this.isInvalidField(field) ? 'ng-invalid ng-dirty' : '';
  }

  get emailErrorMessage(): string {
    const emailErrors = this.settingsForm.get('email')?.errors;

    if (emailErrors?.required) {
      return 'El email es requerido';
    } else if (emailErrors?.emailTaken) {
      return 'El email no está disponible';
    }

    return '';
  }

  get passwordErrorMessage(): string {
    const passwordErrors = this.settingsForm.get('password')?.errors;

    if (passwordErrors?.required) {
      return 'La contraseña actual es requerida';
    } else if (passwordErrors?.wrongPassword) {
      return 'El contraseña es incorrecta';
    }

    return '';
  }

  get newPasswordConfirm(): string {
    const passwordErrors = this.settingsForm.get('newPass1')?.errors;

    if (passwordErrors?.required) {
      return 'La nueva contraseña es requerida';
    } else if (passwordErrors?.minlength) {
      return 'La contraseña debe ser de al menos 6 caracteres';
    }

    return '';
  }
}
