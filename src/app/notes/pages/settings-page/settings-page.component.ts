import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  providers: [MessageService],
})
export class SettingsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('fileChooser') fileChooser!: ElementRef<HTMLInputElement>;

  settingsForm = this.fb.group({
    name: ['Eduardo Chávez', [Validators.required]],
    email: ['ceduardd@example.com', [Validators.required]],
    password: ['', [Validators.required]],
    newPass1: ['', [Validators.required]],
    newPass2: ['', [Validators.required]],
  });

  passwordInputsHidden: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  ngAfterViewInit(): void {
    // console.log(this.fileChooser.nativeElement);
  }

  ngOnInit(): void {}

  showPasswordInputs() {
    this.passwordInputsHidden = !this.passwordInputsHidden;
  }

  showSuccess() {
    this.messageService.clear();
    this.messageService.add({
      key: 'successToast',
      sticky: true,
      severity: 'success',
      summary: 'Los cambios han sido guardados',
    });
  }

  saveProfileChanges() {
    // TODO: implement update profile changes

    console.log('doing http request to save changes');
    console.log(this.settingsForm.value);

    this.showSuccess();
  }

  updateProfilePic() {
    console.log('update');
    this.fileChooser?.nativeElement.click();
  }

  fileChooserHandler(e: Event) {
    const target = e.target as HTMLInputElement;

    const filesList: FileList | null = target.files;

    if (filesList) {
      console.log(filesList[0]);
    }
  }

  removeProfilePic() {
    console.log('remove');
  }
}
