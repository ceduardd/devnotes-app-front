import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styles: [],
  providers: [MessageService],
})
export class EditorPageComponent implements OnInit {
  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'discardToast',
      sticky: true,
      severity: 'warn',
      summary: '¿Estas seguro de descartar los cambios?',
      detail: 'Confrmar para proceder',
    });
  }

  showSuccess() {
    this.messageService.clear();
    this.messageService.add({
      key: 'successToast',
      sticky: true,
      severity: 'success',
      summary: 'Los cambios han sido guardados',
      detail: 'Puede volver a la página inicial',
    });
  }

  onConfirm() {
    this.messageService.clear('discardToast');

    // Call to discard changes method
    this.discardChanges();
  }

  onReject() {
    this.messageService.clear('discardToast');
  }

  goBack() {
    // TODO: if there are no changes go back
    this.router.navigateByUrl('/');
  }

  discardChanges() {
    // TODO: implement discard changes method
    this.router.navigateByUrl('/');
  }

  saveChanges() {
    // TODO: implement save changes method
    this.showSuccess();
  }
}
