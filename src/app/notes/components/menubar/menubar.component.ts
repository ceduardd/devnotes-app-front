import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  providers: [MessageService],
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Archivo',
      icon: 'pi pi-fw pi-folder',
      routerLink: ['/archive'],
    },
    {
      label: 'Papelera',
      icon: 'pi pi-fw pi-trash',
      routerLink: ['/trash'],
    },
    {
      label: 'Ajustes',
      icon: 'pi pi-fw pi-cog',
      routerLink: ['/settings'],
    },
  ];

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'logoutToast',
      sticky: true,
      severity: 'warn',
      summary: '¿Desea cerrar la sesión?',
      detail: 'Confrmar para proceder',
    });
  }

  onConfirm() {
    this.messageService.clear('logoutToast');

    // Call to logout method
    this.logout();
  }

  onReject() {
    this.messageService.clear('logoutToast');
  }

  logout() {
    // TODO: implement logout against any backend server
    this.router.navigateByUrl('/auth');
  }
}
